import random

from fastapi import FastAPI
import requests

app = FastAPI()


def get_random_bunker_description():
    url = "https://randomall.ru/api/gens/11915"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Content-Type": "application/json",
        "DNT": "1",
        "Sec-GPC": "1",
        "Referer": "https://randomall.ru/custom/gen/11915",
        "Connection": "keep-alive",
        "Origin": "https://randomall.ru",
        "Cookie": "_ga_XY0LZCZG3D=GS1.1.1735162080.1.1.1735162412.0.0.0; _ga=GA1.1.556935018.1735162081",
    }

    data = {}  # Пустой JSON-объект, так как Content-Length: 2

    response = requests.post(url, headers=headers, json=data)

    if response.status_code == 200:
        return response.json()
    else:
        return None


def get_random_player_card():
    url = "https://randomall.ru/api/gens/3060"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Content-Type": "application/json",
        "DNT": "1",
        "Sec-GPC": "1",
        "Referer": "https://randomall.ru/custom/gen/3060",
        "Connection": "keep-alive",
        "Origin": "https://randomall.ru",
        "Cookie": "_ga_XY0LZCZG3D=GS1.1.1735162080.1.1.1735162726.0.0.0; _ga=GA1.1.556935018.1735162081",
    }

    data = {}  # Пустой JSON-объект, так как Content-Length: 2

    response = requests.post(url, headers=headers, json=data)

    if response.status_code == 200:
        return response.json()
    else:
        return None


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
            "catastrophe": "Зомби апокалипсис",
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
    for i in range(5):
        cards["bunker_description"]["tools"].append(get_random_bunker_description())
    for i in range(5):
        cards["player_cards"].append(get_random_player_card())
    return cards
