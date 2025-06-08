from fastapi import WebSocket, APIRouter, Query
from typing import Dict
import json
import uuid

router = APIRouter()


class ConnectionManager:
    def __init__(self):
        self.active_rooms: Dict[str, Dict] = {}

    async def connect(self, websocket: WebSocket, room_id: str, user_id: str):
        await websocket.accept()

        if room_id not in self.active_rooms:
            self.active_rooms[room_id] = {
                "players": {},
                "cards": {},
                "max_players": 12
            }

        # Если комната заполнена — разрываем соединение
        if len(self.active_rooms[room_id]["players"]) >= self.active_rooms[room_id]["max_players"]:
            await websocket.close(code=4000, reason="Room is full")
            return

        self.active_rooms[room_id]["players"][user_id] = websocket
        await self._broadcast_room_state(room_id)

        print(f"✅ Брад = New connection: room_id={room_id}, user_id={user_id}")
        print(f"🎮 Чертей = players: {len(self.active_rooms[room_id]['players'])}")

    async def disconnect(self, room_id: str, user_id: str):
        if room_id in self.active_rooms:
            room = self.active_rooms[room_id]

            room["players"].pop(user_id, None)
            room["cards"].pop(user_id, None)

            await self._broadcast_room_state(room_id)

            if not room["players"]:
                del self.active_rooms[room_id]

    async def _broadcast_room_state(self, room_id: str):
        if room_id in self.active_rooms:
            room = self.active_rooms[room_id]
            message = {
                "type": "roomState",
                "count": len(room["players"]),
                "max_players": room["max_players"],
                "room_id": room_id
            }

            for ws in room["players"].values():
                await ws.send_text(json.dumps(message))

            print(f"📡 Broadcasting room state: {message}")

    async def _broadcast_players_cards(self, room_id: str):
        """Рассылает всем игрокам карточки всех в комнате."""
        if room_id not in self.active_rooms:
            return

        cards = list(self.active_rooms[room_id]["cards"].values())

        message = {
            "type": "playersCards",
            "cards": cards
        }

        for ws in self.active_rooms[room_id]["players"].values():
            await ws.send_text(json.dumps(message))

        print(f"Broadcasting playersCards ({len(cards)} players) to room {room_id}")
        

manager = ConnectionManager()


@router.websocket("/ws/room/{room_id}")
async def websocket_endpoint(
    websocket: WebSocket,
    room_id: str,
    user_id: str = Query(default_factory=lambda: str(uuid.uuid4()))
):
    await manager.connect(websocket, room_id, user_id)
    try:
        while True:
            data = await websocket.receive_text()
            print(f"⬅️  Message from {user_id}: {data}")

            try:
                message = json.loads(data)

                # Игрок прислал свои карточки
                if message.get("type") == "playerReady":
                    player_data = message.get("data")
                    player_data["user_id"] = user_id
                    manager.active_rooms[room_id]["cards"][user_id] = player_data
                    print(f"Saved card for user {user_id} in room {room_id}")
                    await manager._broadcast_players_cards(room_id)

                elif message.get("type") == "startGame":
                    start_game_msg = json.dumps({
                        "type": "startGame",
                        "room_id": room_id
                    })
                    print(f"---Ихххали in room {room_id}")

                    for ws in manager.active_rooms[room_id]["players"].values():
                        await ws.send_text(start_game_msg)

            except json.JSONDecodeError:
                print("---LEEEEE -> JSON parsing error:", data)

    except Exception as e:
        print(f"Connection error: {e}")
    finally:
        await manager.disconnect(room_id, user_id)