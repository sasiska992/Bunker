from fastapi import WebSocket, APIRouter, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from typing import List, Dict

# from .rooms import rooms

router = APIRouter()

html = """
<!DOCTYPE html>
<html>
<head>
    <title>Chat</title>
</head>
<body>
    <h1>Тестовые кнопки</h1>
    <button onclick="connect(event)" id="connect">Подключиться</button>
    <button onclick="disconnect(event)" id="disconnect">Отключиться</button>
    <ul id='enters'></ul>
    <script>
        var ws;

        function connect(event) {
            // Проверяем, если WebSocket уже открыт
            if (ws && ws.readyState === WebSocket.OPEN) {
                console.log("Уже подключено к WebSocket");
                return;
            }

            // Создаем новое соединение WebSocket
            ws = new WebSocket("ws://localhost:8000/ws/join_game/123");

            ws.onopen = function() {
                ws.send("User connected");
                console.log("Подключено к WebSocket");
            };

            ws.onmessage = function(event) {
                var messages = document.getElementById('enters');
                var message = document.createElement('li');
                var content = document.createTextNode(event.data);
                message.appendChild(content);
                messages.appendChild(message);
            };

            ws.onclose = function() {
                console.log("Отключено от WebSocket");
            };

            ws.onerror = function(error) {
                console.error("Ошибка WebSocket: ", error);
            };
        }

        function disconnect(event) {
            if (ws) {
                // Отправляем уведомление о выходе
                sendLeaveNotification("User disconnected");
                ws.close(); // Закрываем соединение
                console.log("Отключено от WebSocket");
                ws = null; // Обнуляем переменную ws
            } else {
                console.log("Нет активного соединения для отключения");
            }
        }

        function sendLeaveNotification(message) {
            // Создаем новое соединение WebSocket для отправки уведомления о выходе
            var leaveWs = new WebSocket("ws://localhost:8000/ws/leave_game/123");

            leaveWs.onopen = function() {
                leaveWs.send(message);
                console.log("Уведомление о выходе отправлено: " + message);
                 leaveWs.onmessage = function(event) {
                var messages = document.getElementById('enters');
                var message = document.createElement('li');
                var content = document.createTextNode(event.data);
                message.appendChild(content);
                messages.appendChild(message);
                
            };
                leaveWs.close(); // Закрываем соединение после отправки
            };

            leaveWs.onerror = function(error) {
                console.error("Ошибка WebSocket при отправке уведомления: ", error);
            };
        }
    </script>
</body>
</html>
"""


@router.get("/test_room", tags=["TEST"])
async def room():
    return HTMLResponse(html)


active_users: Dict[str, List[WebSocket]] = {}


@router.websocket("/ws/join_game/{room_id}")
async def join_game(websocket: WebSocket, room_id: str):
    await websocket.accept()
    if room_id not in active_users.keys():
        active_users[room_id] = []
    active_users[room_id].append(websocket)
    print(f"Игрок подключился в комнату {room_id}")

    try:
        while True:
            data = await websocket.receive_text()
            print(data)
            for current_socket in active_users[room_id]:
                # if current_socket != websocket:
                await current_socket.send_text(f"Пользователь подключился. Это уже {len(active_users[room_id])}")
    except WebSocketDisconnect:

        active_users[room_id].remove(websocket)
        if not active_users[room_id]:
            del active_users[room_id]


@router.websocket("/ws/leave_game/{room_id}")
async def leave_game(websocket: WebSocket, room_id: str):
    await websocket.accept()
    print(f"Игрок отключился из комнаты {room_id}!!!!!ТРИВОГА")
    await websocket.send_text("Пользователь отключился")
