import random
from fastapi import APIRouter

from src.ai_requests.utils import generate_ai_player_card


router = APIRouter()


def get_random_residence_time():
    years = random.randint(0, 20)
    months = random.randint(0, 12)
    if years == 0:
        return f"{months} месяцев"
    else:
        return f"{years} лет {months} месяцев"


@router.get("/create_ai_player_cards", tags=["Create cards"])
def create_ai_player_cards(room_id: str):
    return generate_ai_player_card(room_id=room_id)
