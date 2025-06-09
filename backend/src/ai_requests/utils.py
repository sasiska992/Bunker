import json
import os
from src.ai_requests.ai_requests import (
    create_ai_player_cards,
    create_ai_catastrophe_description,
    create_ai_bunker_description,
    create_ai_start_story,
)

import requests

from src.models.bunker import Bunker
from src.models.catastrophe import Catastrophe


def send_ai_request(promt) -> dict:
    from settings import AI_TOKEN

    # Запрашиваем данные у ИИ
    model = "mistralai/mistral-7b-instruct-v0.2"

    completion = requests.post(
        url="https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {AI_TOKEN}",
            "Content-Type": "application/json",
        },
        json={
            "model": model,
            "messages": [{"role": "user", "content": promt}],
            "temperature": 0.8,
            "max_tokens": 1024,
            "response_format": {
                "type": "text"  # Используем text, так как JSON не всегда поддерживается напрямую
            },
        },
    )

    # Получаем сырой ответ
    raw_response = completion.json()["choices"][0]["message"]["content"]
    print("Ответ от ИИ:", raw_response)  # Логируем для отладки

    # Чистим ответ (удаляем Markdown-обрамление)
    cleaned_response = raw_response.replace("```json", "").replace("```", "").strip()

    # Пытаемся распарсить JSON
    try:
        # Пробуем распарсить весь ответ как есть
        data = json.loads(cleaned_response)
    except json.JSONDecodeError:
        # Если не получилось — пробуем вырезать ПЕРВЫЙ JSON из ответа
        try:
            start_idx = cleaned_response.find("{")
            end_idx = cleaned_response.rfind("}") + 1
            if start_idx != -1 and end_idx != -1:
                json_str = cleaned_response[start_idx:end_idx]
                data = json.loads(json_str)
            else:
                raise ValueError("В ответе нет валидного JSON")
        except Exception as e:
            raise ValueError(
                f"Ошибка парсинга JSON: {e}\nИсходный ответ: {raw_response}"
            )

    return data


def generate_ai_catastrophe_description() -> dict:
    promt = create_ai_catastrophe_description()

    return send_ai_request(promt)


def generate_ai_bunker_description(room_id: str) -> dict:
    try:
        catastrophe_data = Catastrophe.select_for_one_key("room_id", room_id)
    except Exception as e:
        raise ValueError(f"\n\nОшибка при получении данных о катастрофе: {e}\n\n")
    if catastrophe_data is None:
        raise ValueError("\n\nКатастрофа не найдена!!! ВНИМАНИЕ!!!\n\n")

    promt = create_ai_bunker_description(catastrophe_data=catastrophe_data)

    return send_ai_request(promt)


def generate_ai_player_card(room_id: str):
    try:
        bunker_data = Bunker.select_for_one_key("room_id", room_id)
        catastrophe_data = Catastrophe.select_for_one_key("room_id", room_id)
    except Exception as e:
        raise ValueError(f"\n\nОшибка при получении данных о катастрофе: {e}\n\n")
    if catastrophe_data is None or bunker_data is None:
        raise ValueError("\n\nКатастрофа или бункер не найдены!!! ВНИМАНИЕ!!!\n\n")
    promt = create_ai_player_cards(
        catastrophe_data=catastrophe_data, bunker_data=bunker_data
    )

    return send_ai_request(promt)


def generate_ai_start_story(room_id: str):
    try:
        bunker_data = Bunker.select_for_one_key("room_id", room_id)
        catastrophe_data = Catastrophe.select_for_one_key("room_id", room_id)
    except Exception as e:
        raise ValueError(f"\n\nОшибка при получении данных о катастрофе: {e}\n\n")
    if catastrophe_data is None or bunker_data is None:
        raise ValueError("\n\nКатастрофа или бункер не найдены!!! ВНИМАНИЕ!!!\n\n")
    promt = create_ai_start_story(
        catastrophe_data=catastrophe_data, bunker_data=bunker_data
    )
    return send_ai_request(promt)
