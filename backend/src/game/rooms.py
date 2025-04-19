from fastapi import APIRouter, Request
import random
from sqlalchemy.exc import SQLAlchemyError

from src.models import Session
from src.models.rooms import Rooms

router = APIRouter()


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
    room = Rooms(id=random_url)
    room.add()

    return url


@router.post("/rooms/join/", summary="Join in created room", tags=["Rooms"])
def join_room(room_id: str):
    try:
        room: Rooms = Rooms.select_for_one_key(column="id", value=room_id)
        room.update_values(active_users=room.active_users + 1)
    except SQLAlchemyError:
        return "Ошибка обновления данных"
    return f"Вы успешно подключились к комнате {room_id}! Тут уже целых {room.active_users + 1}"


@router.delete("/rooms/leave/", summary="Leave from created room", tags=["Rooms"])
def leave_room(room_id: str):
    try:
        room: Rooms = Rooms.select_for_one_key(column="id", value=room_id)
        room.update_values(active_users=room.active_users - 1)
        pass
    except KeyError:
        return "Комната ещё не создана"
    return f"Вы успешно вышли из комнатs {room_id}! Тут теперь {room.active_users - 1}"
