from fastapi import APIRouter
from src.models.bunker import Bunker
from src.models.catastrophe import Catastrophe

from src.ai_requests.utils import generate_ai_bunker_description


router = APIRouter()


@router.get("/bunker_info", tags=["Bunker"])
async def bunker_info(room_id: str):
    res = generate_ai_bunker_description(room_id=room_id)
    bunker = Bunker(
        room_id=room_id,
        bunker_title=res["bunker_title"],
        bunker_description=res["bunker_description"],
        additional_information=res["additional_information"],
        tools=res["tools"],
        size=res["size"],
        number_of_seats=res["number_of_seats"],
        residence_time=res["residence_time"],
    )
    bunker.add()
    return res
