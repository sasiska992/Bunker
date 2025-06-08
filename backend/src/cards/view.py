import json
import random
import re
import logging
from settings import AI_TOKEN
import requests
from fastapi import APIRouter
from openai import OpenAI

from src.ai_requests.utils import generate_ai_player_card, get_request


router = APIRouter()


def get_random_residence_time():
    years = random.randint(0, 20)
    months = random.randint(0, 12)
    if years == 0:
        return f"{months} месяцев"
    else:
        return f"{years} лет {months} месяцев"


# @router.get("/get_start_info", tags=["Cards"])
# async def get_start_info():
#     with open(r"backend_data.json", "r", encoding="utf-8") as f:
#         json_data = json.load(f)
#     # catastrophe_id = random.randint(0, len(json_data) - 1)
#     catastrophe_id = 0
#     catastrophe_data = json_data[catastrophe_id]
#     catastrophe_data["id"] = catastrophe_id
#     return catastrophe_data


# @router.get("/get_players_info", tags=["Cards"])
# async def get_players_info():
#     with open("../../backend_data.json", "r", encoding="utf-8") as f:
#         json_data = json.load(f)
#     # catastrophe_id = random.randint(0, len(json_data) - 1)
#     catastrophe_id = 0
#     players_info = json_data[catastrophe_id]["bunker"]["cards"]
#     return players_info


@router.get("/create_ai_player_cards", tags=["Cards"])
def create_ai_player_cards(room_id: str):
    return generate_ai_player_card(room_id=room_id)


@router.get("/", tags=["Cards"])
async def root():
    cards = dict(
        {
            "bunker_description": {
                "info": [
                    "Водятся летучие мыши",
                    "Неизвестно, когда был построен",
                    "Находится около космодрома",
                    "Спальные места в виде капсул",
                ],
                "tools": [],
                "size": random.randint(50, 1000),
                "residence_time": get_random_residence_time(),
                "food_supply": get_random_residence_time(),
                # todo: доделать места исходя от кол-ва игроков
                "number_of_seats": random.randint(1, 6),
            },
            "player_cards": [],
        }
    )
    cards["bunker_description"] = get_random_bunker_description()
    for i in range(5):
        cards["player_cards"].append(get_random_player_card())
    return cards
