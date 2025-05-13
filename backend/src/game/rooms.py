from fastapi import APIRouter, Request, HTTPException
import random
from sqlalchemy.exc import SQLAlchemyError
from src.models import Session
from src.models.rooms import Rooms

router = APIRouter()

def create_random_url() -> str:
    symbols = [chr(i) for i in range(ord("A"), ord("Z") + 1)] + \
              [chr(i) for i in range(ord("a"), ord("z") + 1)] + \
              [str(i) for i in range(10)]
    return "".join([random.choice(symbols) for _ in range(10)])

@router.post("/rooms/create_room", tags=["Rooms"])
def create_room(request: Request):
    random_url = create_random_url()
    url = f"{request.base_url}?invite={random_url}"
    
    try:
        room = Rooms(id=random_url, active_users=1)
        room.add()
        return {"room_id": random_url, "url": url}
    except SQLAlchemyError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/rooms/join/", tags=["Rooms"])
async def join_room(room_id: str, request: Request):
    try:
        room: Rooms = Rooms.select_for_one_key(column="id", value=room_id)
        if not room:
            raise HTTPException(status_code=404, detail="Room not found")
        
        # Проверяем, не заполнена ли уже комната
        if room.active_users >= 12:  # Максимум 12 игроков
            raise HTTPException(status_code=400, detail="Room is full")
        
        room.update_values(active_users=room.active_users + 1)
        return {
            "message": f"Joined room {room_id}", 
            "count": room.active_users,
            "room_id": room_id,
            "url": f"{request.base_url}?invite={room_id}"
        }
    except SQLAlchemyError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/rooms/leave/", tags=["Rooms"])
def leave_room(room_id: str):
    try:
        room: Rooms = Rooms.select_for_one_key(column="id", value=room_id)
        if not room:
            raise HTTPException(status_code=404, detail="Room not found")
        
        room.update_values(active_users=max(0, room.active_users - 1))
        return {"message": f"Left room {room_id}", "count": room.active_users}
    except SQLAlchemyError as e:
        raise HTTPException(status_code=400, detail=str(e))