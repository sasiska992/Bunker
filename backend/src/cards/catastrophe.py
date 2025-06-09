from fastapi import APIRouter
from src.ai_requests.utils import generate_ai_catastrophe_description
from src.models.catastrophe import Catastrophe
from src.models.rooms import Rooms
from fastapi import APIRouter
import ast

router = APIRouter()


@router.get("/catastrophe_info", tags=["Create cards"])
def catastrophe_info(room_id: str):
    existing = Catastrophe.select_for_one_key(column="room_id", value=room_id)
    if existing:
        return {
            "catastrophe_title": existing.catastrophe_title,
            "catastrophe_description": existing.catastrophe_description,
            "residence_time": existing.residence_time,
            "additional_information": ast.literal_eval(existing.additional_information),
        }

    room = Rooms.select_for_one_key(column="id", value=room_id)
    if room is None:
        raise ValueError(
            "\n\nКомната не найдена! Нужно проверить, что комната действительно существут, то чо ты как чмо\n\n"
        )

    res = generate_ai_catastrophe_description()

    catastrophe = Catastrophe(
        room_id=room_id,
        catastrophe_title=res["catastrophe_title"],
        catastrophe_description=res["catastrophe_description"],
        additional_information=res["additional_information"],
        residence_time=res["residence_time"],
    )
    try:
        catastrophe.add()
    except Exception as e:
        raise ValueError(f"\n\nОшибка при добавлении катастрофы: {e}\n\n")

    return res
