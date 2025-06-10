from fastapi import APIRouter
from src.ai_requests.utils import generate_ai_catastrophe_description
from src.models.catastrophe import Catastrophe
from src.models.rooms import Rooms
from fastapi import APIRouter
import ast

router = APIRouter()


@router.get("/catastrophe_info", tags=["Create cards"])
def catastrophe_info(room_id: str):
    existing = Catastrophe.select_for_one_key(column="room_id", value=room_id)
    if existing:
        return {
            "catastrophe_title": existing.catastrophe_title,
            "catastrophe_description": existing.catastrophe_description,
            "residence_time": existing.residence_time,
            "additional_information": ast.literal_eval(existing.additional_information),
        }

    room = Rooms.select_for_one_key(column="id", value=room_id)
    if room is None:
        raise ValueError(
            "\n\nКомната не найдена! Нужно проверить, что комната действительно существут, то чо ты как чмо\n\n"
        )

    # res = generate_ai_catastrophe_description()
    res ={
        "catastrophe_title": "Тень забвения",
        "catastrophe_description": "В один мрачный день, когда солнце едва пробивалось сквозь облака, мир столкнулся с катастрофой, о которой никто не мог даже предположить. В результате таинственного эксперимента по манипуляции с пространственно-временным континуумом, произошел сбой, который открыл врата в параллельные реальности. Вскоре после этого, в городах начали появляться тени — существа, лишенные формы и разума, которые поглощали воспоминания людей, оставляя их в состоянии полной амнезии.",
        "residence_time": "5 лет, если не будет найден способ закрыть врата и вернуть все на свои места. Если в бункере не окажется никого, кто сможет помочь с исправлением катастрофы, то через 2 года тени начнут проникать внутрь, поглощая последние воспоминания выживших.",
        "additional_information": [
            "До отключения установок осталось 3 года, и они могут активировать новые параллельные реальности.",
            "Выжившие должны найти способ восстановить контроль над ситуацией, иначе мир погрузится в вечное забвение."
        ] 
    }

    catastrophe = Catastrophe(
        room_id=room_id,
        catastrophe_title=res["catastrophe_title"],
        catastrophe_description=res["catastrophe_description"],
        additional_information=res["additional_information"],
        residence_time=res["residence_time"],
    )
    try:
        catastrophe.add()
    except Exception as e:
        raise ValueError(f"\n\nОшибка при добавлении катастрофы: {e}\n\n")

    return res
