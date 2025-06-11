from fastapi import APIRouter, HTTPException

# === Импорты ===
from src.models.rooms import Rooms
from src.models.player_cards import PlayerCards
from src.ai_requests.utils import generate_ai_player_card
from sqlalchemy.exc import IntegrityError

router = APIRouter()


@router.get("/get_player_cards")
def get_player_cards(room_id: str):
    try:
        existing = PlayerCards.select_all_by_fields(room_id=room_id)
        print(existing)
        if existing:
            return {"status": 200, "result": [player.to_dict() for player in existing]}
        else:
            return {
                "status": 400,
                "message": "Не найдено карточек игроков в этой комнате",
            }
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Ошибка при выборке карточек игроков: {e}"
        )


@router.get("/create_ai_player_card")
def create_ai_player_card(room_id: str, user_id: str):
    room = Rooms.select_for_one_key(column="id", value=room_id)
    if room is None:
        raise HTTPException(status_code=500, detail="Комната не найдена!")

    if PlayerCards.select_for_one_key(column="user_id", value=user_id):
        return {"status": 400, "message": "Игрок уже имеет карточку в комнате"}

    # res = generate_ai_player_card(room_id=room_id)
    res = {
        "sex": "Женщина",
        "age": "31",
        "health": "Алкоголизм",
        "profession": "Медсестра",
        "inventory": "Кукла Вуду",
        "phobia": "Боязнь призраков / духов",
        "hobby": "Часто смотрит GustBusters",
        "violation_of_law": "Отсутствует",
        "additional_information": "Взломала базу данных ЦРУ",
        "bad_habits": "Отсутствует",
        "work_experience": "10 лет",
        "impact_of_disaster": "Потерял семью",
    }

    player_card = PlayerCards(
        user_id=user_id,
        room_id=room_id,
        sex=res["sex"],
        age=res["age"],
        health=res["health"],
        profession=res["profession"],
        inventory=res["inventory"],
        phobia=res["phobia"],
        hobby=res["hobby"],
        violation_of_law=res["violation_of_law"],
        additional_information=res["additional_information"],
        bad_habits=res["bad_habits"],
        work_experience=res["work_experience"],
        impact_of_disaster=res["impact_of_disaster"],
    )

    try:
        player_card.add()
        return {"status": 200, "result": res}
    except IntegrityError:
        return {
            "status": 400,
            "message": f"Карточка игрока с user_id={user_id} уже существует.",
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Неизвестная ошибка при добавлении карточки игрока: {e}",
        )


@router.get("/create_ai_player_cards")
def create_ai_player_cards(room_id: str):
    room = Rooms.select_for_one_key(column="id", value=room_id)
    if room is None:
        raise HTTPException(status_code=500, detail="Комната не найдена!")
    import random

    user_id = str(random.randint(1, 100))
    if PlayerCards.select_for_one_key(column="user_id", value=user_id):
        return {"status": 400, "message": "Игрок уже имеет карточку в комнате"}
    # res = generate_ai_player_card(room_id=room_id)
    res = {
        "sex": "Мужчина",
        "age": "31",
        "health": "Алкоголизм",
        "profession": "Медсестра",
        "inventory": "Кукла Вуду",
        "phobia": "Боязнь призраков / духов",
        "hobby": "Часто смотрит GustBusters",
        "violation_of_law": "Отсутствует",
        "additional_information": "Взломала базу данных ЦРУ",
        "bad_habits": "Отсутствует",
        "work_experience": "10 лет",
        "impact_of_disaster": "Потерял семью",
    }

    player_card = PlayerCards(
        user_id=user_id,
        room_id=room_id,
        sex=res["sex"],
        age=res["age"],
        health=res["health"],
        profession=res["profession"],
        inventory=res["inventory"],
        phobia=res["phobia"],
        hobby=res["hobby"],
        violation_of_law=res["violation_of_law"],
        additional_information=res["additional_information"],
        bad_habits=res["bad_habits"],
        work_experience=res["work_experience"],
        impact_of_disaster=res["impact_of_disaster"],
    )

    try:
        player_card.add()
        return {
            "sex": res["sex"],
            "age": res["age"],
            "health": res["health"],
            "profession": res["profession"],
            "inventory": res["inventory"],
            "phobia": res["phobia"],
            "hobby": res["hobby"],
            "violation_of_law": res["violation_of_law"],
            "additional_information": res["additional_information"],
            "bad_habits": res["bad_habits"],
            "work_experience": res["work_experience"],
            "impact_of_disaster": res["impact_of_disaster"],
        }
    except IntegrityError:
        return {
            "status": 400,
            "message": f"Карточка игрока с user_id={user_id} уже существует.",
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Неизвестная ошибка при добавлении карточки игрока: {e}",
        )
