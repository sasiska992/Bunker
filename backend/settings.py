import os
import sys
from pathlib import Path

from dotenv import load_dotenv

# Определите путь к файлу .env
env_path = Path(__file__).resolve().parent / '.env'

# Загрузка переменных окружения из файла .env
load_dotenv(dotenv_path=env_path)

# Получение переменной окружения
AI_TOKEN = os.getenv("AI_TOKEN")

# Проверка значения переменной
if AI_TOKEN:
    pass
else:
    sys.exit("Environs from .env does`t load")
