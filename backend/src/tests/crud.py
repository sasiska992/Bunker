# from backend.src.models.bunker import Bunker
# from backend.src.models.catastrophe import Catastrophe
from src.models import Session
from src.models.base import Base
from src.models.rooms import Rooms
from src.models.bunker import Bunker
from src.models.catastrophe import Catastrophe


def add_room(active_users=0):
    with Session() as session:
        room = Rooms()
        session.add(room)
        session.commit()
        # Закрытие сессии
        print("команта создана")


def add_player(room_id):
    with Session() as session:
        current_room: Rooms = session.query(Rooms).filter_by(id=room_id).first()
        current_room.active_users += 1
        session.commit()
        # Закрытие сессии


def delete_player(room_id, modal, key):
    with Session() as session:
        # print(session.query(modal).filter_by(id=room_id).first())
        print(session.query(Rooms).filter_by(id=room_id).all())
        current_room: Rooms = session.query(Rooms).filter_by(id=room_id).first()
        current_room.active_users -= 1
        # session.commit()
        print("delete DONE")
        # Закрытие сессии


# add_room()
# add_player(1)
# Rooms.update_values(Rooms, borb="kurva", a="a", b="b")

# room = Base.select_for_one_key(Rooms, "id", 1)
# print(room)

# delete_player(1, Rooms, 1)


# Пример использования
# room_id = "e5dgaY020e"  # Замените на нужный ID
# room: Rooms = Rooms.select_for_one_key(column="id", value=room_id)

# if room:
#     room.update_values(active_users=room.active_users + 1)
#     print(room.active_users)
# else:
#     print("Комната не найдена.")

from sqlalchemy.orm import Session
from src.models import Rooms, Catastrophe, Bunker


def create_room_with_catastrophe_and_bunker(room_id: str):
    # 1. Создаём комнату
    room = Rooms(id=room_id, active_users=0)
    room.add()

    # 2. Создаём катастрофу и связываем с комнатой
    catastrophe = Catastrophe(
        room_id=room_id,
        catastrophe_title="Тень забвения",
        catastrophe_description="В один мрачный день, когда солнце едва пробивалось сквозь облака, "
        "мир столкнулся с катастрофой, о которой никто не мог даже предположить...",
        residence_time="5 лет, если не будет найден способ закрыть врата и вернуть все на свои места. "
        "Если в бункере не окажется никого, кто сможет помочь с исправлением катастрофы, "
        "то через 2 года тени начнут проникать внутрь, поглощая последние воспоминания выживших.",
        additional_information_1="До отключения установок осталось 3 года, и они могут активировать новые параллельные реальности.",
        additional_information_2="Выжившие должны найти способ восстановить контроль над ситуацией, иначе мир погрузится в вечное забвение.",
    )

    # 3. Создаём бункер и связываем с комнатой
    bunker = Bunker(
        room_id=room_id,
        bunker_title="Центр контроля реальностей",
        bunker_description="Этот бункер был построен как исследовательский центр для изучения параллельных реальностей. "
        "Он оснащен высокими технологиями и оборудованием, необходимым для анализа и закрытия врат. "
        "Однако, без квалифицированных специалистов, его возможности остаются неиспользованными.",
        additional_information_1="В бункере есть система мониторинга, которая может отслеживать активность теней.",
        additional_information_2="Запасы энергии истощаются, и необходимо найти способ перезапустить генераторы.",
        tools='["Компьютеры для анализа данных", "Система мониторинга", "Запасы еды и воды", "Аптечка первой помощи", "Генераторы"]',
        size=400,
        number_of_seats=5,
    )

    # Добавляем всё в сессию
    # session.add_all([catastrophe, bunker])
    catastrophe.add()
    bunker.add()
    print(Bunker.select_for_one_key(room_id=room_id))
    print(Catastrophe.select_for_one_key(room_id=room_id))
    print(Rooms.select_for_one_key(id=room_id))

    # Сохраняем изменения

    print(f"Комната {room_id} успешно создана вместе с катастрофой и бункером.")
