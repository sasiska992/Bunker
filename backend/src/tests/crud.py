from src.models import Session
from src.models.base import Base
from src.models.rooms import Rooms


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
room_id = "e5dgaY020e"  # Замените на нужный ID
room: Rooms = Rooms.select_for_one_key(column="id", value=room_id)

if room:
    room.update_values(active_users=room.active_users + 1)
    print(room.active_users)
else:
    print("Комната не найдена.")
