import random

from fastapi import FastAPI
import requests
import time

app = FastAPI()


def get_random_bunker_description():
    url = "https://randomall.ru/api/gens/11906"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Content-Type": "application/json",
        "Origin": "https://randomall.ru",
        "DNT": "1",
        "Sec-GPC": "1",
        "Connection": "keep-alive",
        "Referer": "https://randomall.ru/custom/gen/11906",
        "Cookie": "_ga_XY0LZCZG3D=GS1.1.1735384160.14.1.1735384160.0.0.0; _ga=GA1.1.556935018.1735162081",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors"
    }

    data = {}  # Поскольку Content-Length: 2, предполагаем, что тело запроса пустое или содержит минимальные данные.

    response = requests.post(url, headers=headers, json=data)
    result = response.json()["msg"]
    data = [string.split("\n\n") for string in result.split("][ ")[1:]]
    bunker_data = data[1]
    catastrophe_data = data[0]
    bunker_description = {
        "catastrophe": {
            "catastrophe_title": catastrophe_data[0].split("Сценарий катастрофы: ")[1].replace(".", ""),
            "catastrophe_description": catastrophe_data[1],
            "residence_time": catastrophe_data[2].split("\n")[0].replace("- ", ""),
            "additional_information": [info for info in catastrophe_data[2].split("\n")[1:][:2]],
        },
        "bunker": {
            "bunker_title": bunker_data[0].split("Укрытие: ")[1].split("\n")[0],
            "bunker_description": bunker_data[1],
            "additional_information": [info for info in bunker_data[2].split("\n")],
            "tools": [info for info in bunker_data[3].split("\n")],
            "size": random.randint(50, 1000),
            "number_of_seats": random.randint(1, 6),  # todo: доделать места исходя от кол-ва игроков
        }
    }
    if response.status_code == 200:
        return bunker_description
    else:
        return None



def get_random_player_card():
    url = "https://randomall.ru/api/gens/1591"
    headers = {
    "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:133.0) Gecko/20100101 Firefox/133.0",
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Content-Type": "application/json",
    "Origin": "https://randomall.ru",
    "DNT": "1",
    "Sec-GPC": "1",
    "Connection": "keep-alive",
    "Referer": "https://randomall.ru/custom/gen/1591",
    "Cookie": "_ga_XY0LZCZG3D=GS1.1.1735512589.1.0.1735512589.0.0.0; _ga=GA1.1.2077015445.1735512589; _ym_uid=1735512590251421862; _ym_d=1735512590; _ym_isad=1; _ym_visorc=w",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "TE": "trailers"
    }

    data = dict()  # Поскольку Content-Length: 2, предполагаем, что тело запроса пустое или содержит минимальные данные

    response = requests.post(url, headers=headers, json=data)

    return response.json()




def get_random_residence_time():
    years = random.randint(0, 20)
    months = random.randint(0, 12)
    if years == 0:
        return f"{months} месяцев"
    else:
        return f"{years} лет {months} месяцев"



@app.get("/")
async def root():
    cards = dict(
        {
            "bunker_description": {
                "info": ["Водятся летучие мыши", "Неизвестно, когда был построен", "Находится около космодрома", "Спальные места в виде капсул"],
                "tools": [],
                "size": random.randint(50, 1000),
                "residence_time": get_random_residence_time(),
                "food_supply": get_random_residence_time(),
                "number_of_seats": random.randint(1, 6),  # todo: доделать места исходя от кол-ва игроков
            },
            "player_cards": []
        }
    )
    cards["bunker_description"] = get_random_bunker_description()
    for i in range(5):
        cards["player_cards"].append(get_random_player_card())
    return cards
