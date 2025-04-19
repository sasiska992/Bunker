from sqlalchemy import Integer
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from src.models.base import Base


class Rooms(Base):
    __tablename__ = "user_account"
    id: Mapped[str] = mapped_column(primary_key=True)
    active_users: Mapped[int] = mapped_column(Integer())

    def __init__(self, id: str, active_users: int = 0):
        self.id = id
        self.active_users = active_users

    def __repr__(self):
        return f"В комнате {self.id} сейчас {self.active_users}"
