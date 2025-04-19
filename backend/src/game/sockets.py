from fastapi import WebSocket, APIRouter
from fastapi.responses import HTMLResponse
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
            ws = new WebSocket("ws://localhost:8000/join_game");

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
            var leaveWs = new WebSocket("ws://localhost:8000/leave_game");

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


@router.websocket("/join_game")
async def join_game(websocket: WebSocket):
    await websocket.accept()
    print("Игрок подключился")
    await websocket.send_text("Пользователь подключился")


@router.websocket("/leave_game")
async def leave_game(websocket: WebSocket):
    await websocket.accept()
    print("Игрок отключился!!!!!ТРИВОГА")
    await websocket.send_text("Пользователь отключился")
