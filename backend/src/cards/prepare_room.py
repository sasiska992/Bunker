from fastapi import APIRouter, Body
from src.cards.bunker import bunker_info
from src.cards.catastrophe import catastrophe_info
from src.cards.player_cards import create_ai_player_card
from pydantic import BaseModel

router = APIRouter()

# Добавляем модель для входных данных
class PrepareRoomRequest(BaseModel):
    user_ids: list[str]

@router.post("/prepare_room", tags=["Prepare room"])
async def prepare_room(
    room_id: str,
    request: PrepareRoomRequest = Body(...)
):
    # 1. Загрузка данных о катастрофе
    catastrophe_data = catastrophe_info(room_id=room_id)
    if not catastrophe_data:
        raise ValueError("Failed to load catastrophe data")

    # 2. Загрузка данных о бункере
    bunker_data = bunker_info(room_id=room_id)
    if not bunker_data:
        raise ValueError("Failed to load bunker data")

    # 3. Создаем карточки для всех игроков
    for user_id in request.user_ids:
        player_card = create_ai_player_card(room_id=room_id, user_id=user_id)
        if not player_card:
            raise ValueError(f"Failed to create card for user {user_id}")

    return {"status": "success", "message": "Room prepared"}