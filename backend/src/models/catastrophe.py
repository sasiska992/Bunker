from sqlalchemy import ForeignKey, String, Text, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from src.models.base import Base


class Catastrophe(Base):
    __tablename__ = "catastrophes"

    id: Mapped[int] = mapped_column(Integer(), primary_key=True)
    room_id: Mapped[str] = mapped_column(ForeignKey("rooms.id"))  # связь с комнатой
    catastrophe_title: Mapped[str] = mapped_column(String(255))
    residence_time: Mapped[str] = mapped_column(String(255))
    catastrophe_description: Mapped[str] = mapped_column(Text())
    additional_information: Mapped[str] = mapped_column(Text(), nullable=True)

    # Связь с комнатой
    room: Mapped["Rooms"] = relationship("Rooms", back_populates="catastrophe")

    def __init__(
        self,
        room_id: str,
        catastrophe_title: str,
        residence_time: str,
        catastrophe_description: str,
        additional_information: str,
    ):
        self.room_id = room_id
        self.catastrophe_title = catastrophe_title
        self.catastrophe_description = catastrophe_description  # описание катастрофы
        self.additional_information = (
            additional_information  # дополнительная информация
        )
        self.residence_time = residence_time  # время нахождения в бункере

    def __repr__(self):
        return (
            f"<Catastrophe(title='{self.catastrophe_title}', room_id='{self.room_id}')>"
        )
