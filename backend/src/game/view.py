from fastapi import APIRouter, Request
import random

router = APIRouter()

rooms = {}


def create_random_url() -> str:
    """
    :return: the random url address for new game
    """
    letters = [chr(i) for i in range(ord("A"), ord("Z") + 1)] + [chr(i) for i in range(ord("a"), ord("z") + 1)]
    numbers = [str(i) for i in range(10)]
    symbols = letters + numbers
    random_addr = "".join([random.choice(symbols) for _ in range(10)])
    return random_addr


@router.post("/rooms/create_room", tags=["Rooms"])
def create_room(request: Request):
    random_url = create_random_url()
    url = str(request.base_url) + random_url
    rooms[random_url] = {"users": 0}
    return url


@router.post("/rooms/join/", summary="Join in created room", tags=["Rooms"])
def join_room(room_id: str):
    try:
        rooms[room_id]["users"] += 1
    except KeyError:
        return "Комната ещё не создана"
    return f"Вы успешно подключились к комнате {room_id}! Тут уже целых {rooms[room_id]['users']}"


@router.delete("/rooms/leave/", summary="Leave from created room", tags=["Rooms"])
def leave_room(room_id: str):
    try:
        rooms[room_id]["users"] -= 1
    except KeyError:
        return "Комната ещё не создана"
    return f"Вы успешно вышли из комнаты {room_id}! Тут теперь {rooms[room_id]['users']}"
