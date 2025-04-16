import os
from typing import Literal


def get_response(title: Literal[
    "player_card"
]) -> str:
    """

    :param title: The title for AI request. You can take it form backend/src/ai_requests
    :return: AI request
    """
    path = os.path.join(os.path.dirname(os.path.abspath(__file__)), title + ".txt")

    with open(path, "r", encoding="UTF-8") as file:
        return " ".join(file.readlines())
