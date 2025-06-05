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
                "max_players": 12
            }
        
        # Проверяем, не заполнена ли комната
        if len(self.active_rooms[room_id]["players"]) >= self.active_rooms[room_id]["max_players"]:
            await websocket.close(code=4000, reason="Room is full")
            return
        
        self.active_rooms[room_id]["players"][user_id] = websocket
        await self._broadcast_room_state(room_id)

        print(f"New connection: room_id={room_id}, user_id={user_id}")
        print(f"Current players: {len(self.active_rooms[room_id]['players'])}")

    async def disconnect(self, room_id: str, user_id: str):
        if room_id in self.active_rooms and user_id in self.active_rooms[room_id]["players"]:
            del self.active_rooms[room_id]["players"][user_id]
            await self._broadcast_room_state(room_id)
            
            if not self.active_rooms[room_id]["players"]:
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
            
            for player_ws in room["players"].values():
                await player_ws.send_text(json.dumps(message))
            print(f"Broadcasting room state: {message}") 

manager = ConnectionManager()

import json  # Убедись, что импорт есть сверху

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
            print(f"Received message from {user_id}: {data}")
            try:
                message = json.loads(data)

                # Обработка команды запуска игры
                if message.get("type") == "startGame":
                    start_game_msg = json.dumps({
                        "type": "startGame",
                        "room_id": room_id
                    })
                    # Разослать всем игрокам в комнате
                    room = manager.active_rooms.get(room_id)
                    if room:
                        for player_ws in room["players"].values():
                            await player_ws.send_text(start_game_msg)
                        print(f"Game started in room {room_id}")
            except json.JSONDecodeError:
                print("Ошибка парсинга JSON:", data)

    except Exception as e:
        print(f"Connection error: {e}")
    finally:
        await manager.disconnect(room_id, user_id)
