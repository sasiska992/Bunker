from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from settings import DB_USER, DB_PASSWORD, DB_HOST, DB_NAME

# engine = create_engine(f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@{DB_ADDR}/{DB_NAME}", echo=True)
engine = create_engine(
    f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"
)

Session = scoped_session(sessionmaker(bind=engine))


def create_data():
    from src.models.base import Base
    from src.models.rooms import Rooms
    from src.models.catastrophe import Catastrophe
    from src.models.bunker import Bunker

    # Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)
    print("Tables created")
