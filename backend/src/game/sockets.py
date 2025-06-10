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
            self.active_rooms[room_id] = {"players": {}, "cards": {}, "max_players": 12}

        # Если комната заполнена — разрываем соединение
        if (
            len(self.active_rooms[room_id]["players"])
            >= self.active_rooms[room_id]["max_players"]
        ):
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
                "room_id": room_id,
            }

            for ws in room["players"].values():
                await ws.send_text(json.dumps(message))

            print(f"📡 Broadcasting room state: {message}")

    async def _broadcast_players_cards(self, room_id: str):
        """Рассылает всем игрокам карточки всех в комнате."""
        if room_id not in self.active_rooms:
            return

        cards = list(self.active_rooms[room_id]["cards"].values())

        message = {"type": "playersCards", "cards": cards}

        for ws in self.active_rooms[room_id]["players"].values():
            await ws.send_text(json.dumps(message))

        print(f"Broadcasting playersCards ({len(cards)} players) to room {room_id}")

    async def _broadcast_to_room(self, room_id: str):
        """Рассылает сообщение всем игрокам в комнате."""
        if room_id not in self.active_rooms:
            return

        message = {"type": "worldPrepared", "message": "startGame"}

        for ws in self.active_rooms[room_id]["players"].values():
            await ws.send_text(json.dumps(message))

    async def _send_all_ids(self, room_id: str, ws: WebSocket):
        """Отправляет всем игрокам их id."""
        if room_id not in self.active_rooms:
            return

        message = {
            "type": "sendAllIds",
            "ids": list(self.active_rooms[room_id]["players"].keys()),
        }
        print(
            f"\n\n\nПришел запрос на получение id всех игроков в комнате {room_id} и вернулось {message.get("ids")}\n\n\n"
        )
        await ws.send_text(json.dumps(message))

    async def _broadcast_open_card(self, room_id: str, user_id: str, card_id: int):
        """Рассылает всем игрокам, что карточка открыта."""
        if room_id not in self.active_rooms:
            return

        message = {
            "type": "playersCards",
            "user_id": user_id,
            "card_id": card_id,
        }

        for ws in self.active_rooms[room_id]["players"].values():
            await ws.send_text(json.dumps(message))

        print("\n\nПользователь открыл карточку\n\n")


manager = ConnectionManager()


@router.websocket("/ws/room/{room_id}")
async def websocket_endpoint(
    websocket: WebSocket,
    room_id: str,
    user_id: str = Query(default_factory=lambda: str(uuid.uuid4())),
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
                    start_game_msg = json.dumps(
                        {"type": "startGame", "room_id": room_id}
                    )
                    print(f"---Ихххали in room {room_id}")

                    for ws in manager.active_rooms[room_id]["players"].values():
                        await ws.send_text(start_game_msg)
                # Сервер прислал, что данные готовы, их можно пулить с бека всем клиентам
                elif message.get("type") == "readyToStart":
                    data = message.get("data")
                    print(
                        "\n\nАдмин прислал, что можно начинать игру. СТАРУЕМММ!!!\n\n"
                    )
                    await manager._broadcast_to_room(room_id)

                elif message.get("type") == "getAllIds":
                    await manager._send_all_ids(room_id, websocket)

                elif message.get("type") == "openCard":
                    await manager._broadcast_open_card(room_id, user_id, message.get("card_id"))

            except json.JSONDecodeError:
                print("---LEEEEE -> JSON parsing error:", data)

    except Exception as e:
        print(f"Connection error: {e}")
    finally:
        await manager.disconnect(room_id, user_id)
