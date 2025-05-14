import os
import sys
from pathlib import Path

from dotenv import load_dotenv

# Определите путь к файлу .env
env_path = Path(__file__).resolve().parent / ".env"

# Загрузка переменных окружения из файла .env
load_dotenv(dotenv_path=env_path)

# Получение переменной окружения
AI_TOKEN = os.getenv("AI_TOKEN")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_USER = os.getenv("DB_USER")
DB_NAME = os.getenv("DB_NAME")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")

# Проверка значения переменной
if AI_TOKEN and DB_PASSWORD and DB_USER and DB_NAME and DB_HOST and DB_PORT:
    pass
else:
    sys.exit("Environs from .env does`t load")
