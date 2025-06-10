from fastapi import APIRouter
from src.cards.bunker import bunker_info
from src.cards.catastrophe import catastrophe_info
from src.cards.player_cards import create_ai_player_card

router = APIRouter()


@router.post("/prepare_room", tags=["Prepare room"])
def prepare_room(room_id: str, user_ids: list[str]):
    # 1. Загрузка данных о катастрофе
    catastrophe_data = catastrophe_info(room_id=room_id)
    if not catastrophe_data:
        raise ValueError("Failed to load catastrophe data")

    # 2. Загрузка данных о бункере
    bunker_data = bunker_info(room_id=room_id)
    if not bunker_data:
        raise ValueError("Failed to load bunker data")

    for user_id in user_ids:
        # 3. Загрузка карточки игрока
        player_card = create_ai_player_card(room_id=room_id, user_id=user_id)
        if not player_card:
            raise ValueError("Failed to load player card")

    return {"status": 200}
