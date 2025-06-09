from fastapi import APIRouter
from src.ai_requests.utils import generate_ai_catastrophe_description
from src.models.catastrophe import Catastrophe
from src.models.rooms import Rooms
from fastapi import APIRouter

router = APIRouter()


@router.get("/catastrophe_info", tags=["Catastrophe"])
def catastrophe_info(room_id: str):

    existing = Catastrophe.select_for_one_key(column="room_id", value=room_id)
    if existing:
        return {
            "catastrophe_title": existing.catastrophe_title,
            "catastrophe_description": existing.catastrophe_description,
            "additional_information": existing.additional_information
        }

    res = generate_ai_catastrophe_description()

    catastrophe = Catastrophe(
        room_id=room_id,
        catastrophe_title=res["catastrophe_title"],
        catastrophe_description=res["catastrophe_description"],
        additional_information=res["additional_information"],
    )
    catastrophe.add()
    return res
