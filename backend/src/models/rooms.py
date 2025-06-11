from sqlalchemy import Integer
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from src.models.base import Base
from sqlalchemy.orm import relationship
from typing import List


class Rooms(Base):
    __tablename__ = "rooms"
    id: Mapped[str] = mapped_column(primary_key=True, index=True)
    active_users: Mapped[int] = mapped_column(Integer())

    catastrophe: Mapped["Catastrophe"] = relationship(
        "Catastrophe", back_populates="room"
    )
    bunker: Mapped["Bunker"] = relationship("Bunker", back_populates="room")
    player_cards: Mapped[List["PlayerCards"]] = relationship(
        "PlayerCards", back_populates="room"
    )

    def __init__(self, id: str, active_users: int = 0):
        self.id = id
        self.active_users = active_users

    def __repr__(self):
        return f"В комнате {self.id} сейчас {self.active_users}"
