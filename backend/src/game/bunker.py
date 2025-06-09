from fastapi import APIRouter
from src.models.bunker import Bunker
from src.ai_requests.utils import generate_ai_bunker_description
import json

router = APIRouter()


@router.get("/bunker_info", tags=["Bunker"])
def bunker_info(room_id: str):
    existing = Bunker.select_for_one_key(column="room_id", value=room_id)
    if existing:
        return {
            "bunker_title": existing.bunker_title,
            "bunker_description": existing.bunker_description,
            "additional_information": existing.additional_information,
            "tools": existing.tools,
            "size": existing.size,
            "number_of_seats": existing.number_of_seats,
            "residence_time": existing.residence_time
        }

    res = generate_ai_bunker_description(room_id=room_id)

    additional_info_list = res.get("additional_information", [])
    tools_list = res.get("tools", [])

    if isinstance(additional_info_list, str):
        additional_info_list = [additional_info_list]
    if isinstance(tools_list, str):
        tools_list = [tools_list]

    additional_info_json = json.dumps(additional_info_list)
    tools_json = json.dumps(tools_list)

    bunker = Bunker(
        room_id=room_id,
        bunker_title=res["bunker_title"],
        bunker_description=res["bunker_description"],
        additional_information=additional_info_json,
        tools=tools_json,
        size=res["size"],
        number_of_seats=res["number_of_seats"],
        residence_time=res.get("residence_time", "10 лет"),
    )
    bunker.add()
    return res
