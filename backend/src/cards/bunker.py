from fastapi import APIRouter
from src.models.rooms import Rooms
from src.models.bunker import Bunker
from src.ai_requests.utils import generate_ai_bunker_description
import ast

router = APIRouter()


@router.get("/bunker_info", tags=["Create cards"])
def bunker_info(room_id: str):
    existing = Bunker.select_for_one_key(column="room_id", value=room_id)
    if existing:
        return {
            "bunker_title": existing.bunker_title,
            "bunker_description": existing.bunker_description,
            "additional_information": ast.literal_eval(existing.additional_information),
            "tools": ast.literal_eval(existing.tools),
            "size": existing.size,
            "number_of_seats": existing.number_of_seats,
            # "number_of_seats": 5,
        }

    room = Rooms.select_for_one_key(column="id", value=room_id)
    if room is None:
        raise ValueError(
            "\n\nКомната не найдена! Нужно проверить, что комната действительно существут, то чо ты как чмо\n\n"
        )
    res = generate_ai_bunker_description(room_id=room_id)

    # number_of_seats = room.active_users // 2
    number_of_seats = 5

    bunker = Bunker(
        room_id=room_id,
        bunker_title=res["bunker_title"],
        bunker_description=res["bunker_description"],
        additional_information=str(res["additional_information"]),
        tools=str(res["tools"]),
        size=res["size"],
        number_of_seats=number_of_seats,
        # number_of_seats=res["number_of_seats"],
    )

    try:
        bunker.add()
    except Exception as e:
        raise ValueError(f"\n\nОшибка при добавлении бункера: {e}\n\n")
    return res
