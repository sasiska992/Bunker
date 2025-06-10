from sqlalchemy import ForeignKey, String, Text, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from src.models.base import Base


class PlayerCards(Base):
    __tablename__ = "player_cards"

    user_id: Mapped[int] = mapped_column(String(255), primary_key=True)
    room_id: Mapped[str] = mapped_column(ForeignKey("rooms.id"))

    sex: Mapped[str] = mapped_column(String(255))
    age: Mapped[str] = mapped_column(String(255))
    health: Mapped[str] = mapped_column(Text())
    profession: Mapped[str] = mapped_column(Text())
    inventory: Mapped[str] = mapped_column(Text())
    phobia: Mapped[str] = mapped_column(Text())
    hobby: Mapped[str] = mapped_column(Text())
    violation_of_law: Mapped[str] = mapped_column(Text())
    additional_information: Mapped[str] = mapped_column(Text())
    bad_habits: Mapped[str] = mapped_column(String(255))
    work_experience: Mapped[str] = mapped_column(String(255))
    impact_of_disaster: Mapped[str] = mapped_column(String(255))

    # Связь с комнатой
    room: Mapped["Rooms"] = relationship("Rooms", back_populates="player_cards")

    def __init__(
        self,
        user_id: str,
        room_id: str,
        sex: str,
        age: str,
        health: str,
        profession: str,
        inventory: str,
        phobia: str,
        hobby: str,
        violation_of_law: str,
        additional_information: str,
        bad_habits: str,
        work_experience: str,
        impact_of_disaster: str,
    ):
        self.user_id = user_id
        self.room_id = room_id
        self.sex = sex
        self.age = age
        self.health = health
        self.profession = profession
        self.inventory = inventory
        self.phobia = phobia
        self.hobby = hobby
        self.violation_of_law = violation_of_law
        self.additional_information = additional_information
        self.bad_habits = bad_habits
        self.work_experience = work_experience
        self.impact_of_disaster = impact_of_disaster

    def to_dict(self):
        return {
            "id": self.user_id,
            "sex": self.sex,
            "age": self.age,
            "health": self.health,
            "profession": self.profession,
            "inventory": self.inventory,
            "phobia": self.phobia,
            "hobby": self.hobby,
            "violation_of_law": self.violation_of_law,
            "additional_information": self.additional_information,
            "bad_habits": self.bad_habits,
            "work_experience": self.work_experience,
            "impact_of_disaster": self.impact_of_disaster,
        }

    def __repr__(self):
        return f"PlayerCards(room_id={self.room_id}, age={self.age},  profession={self.profession})"
