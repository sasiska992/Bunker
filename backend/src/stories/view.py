from fastapi import APIRouter

from src.ai_requests.utils import generate_ai_start_story

router = APIRouter()


@router.get("/start_story", tags=["Stories"])
def start_story(room_id: str):
    return generate_ai_start_story(room_id=room_id)