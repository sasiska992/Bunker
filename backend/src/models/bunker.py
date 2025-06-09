from sqlalchemy import ForeignKey, String, Text, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from src.models.base import Base


class Bunker(Base):
    __tablename__ = "bunkers"

    id: Mapped[int] = mapped_column(Integer(), primary_key=True)
    room_id: Mapped[str] = mapped_column(ForeignKey("rooms.id"))  # связь с комнатой
    bunker_title: Mapped[str] = mapped_column(String(255))
    bunker_description: Mapped[str] = mapped_column(Text())
    additional_information: Mapped[str] = mapped_column(Text(), nullable=True)
    tools: Mapped[str] = mapped_column(Text())
    size: Mapped[int] = mapped_column(Integer())  # в квадратных метрах
    number_of_seats: Mapped[int] = mapped_column(Integer())

    # Связь с комнатой
    room: Mapped["Rooms"] = relationship("Rooms", back_populates="bunker")

    def __init__(
        self,
        room_id: str,
        bunker_title: str,
        bunker_description: str,
        additional_information: str,
        tools: str,
        size: int,
        number_of_seats: int,
    ):
        self.room_id = room_id
        self.bunker_title = bunker_title
        self.bunker_description = bunker_description  # описание бункера
        self.additional_information = (
            additional_information  # дополнительная информация
        )
        self.tools = tools  # инструменты / оборудование
        self.size = size  # в квадратных метрах
        self.number_of_seats = number_of_seats  # количество мест

    def __repr__(self):
        return f"<Bunker(title='{self.bunker_title}', seats={self.number_of_seats})>"
