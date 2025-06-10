from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.models import create_data

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Определите функцию для включения маршрутизатора
def include_routers():
    from src.game.rooms import router as game_router
    from src.game.sockets import router as socket_router
    from src.cards.player_cards import router as card_router
    from src.cards.bunker import router as bunker_router
    from src.cards.catastrophe import router as catastrophe_router

    from src.cards.prepare_room import router as prepare_room_router
    
    from src.stories.view import router as story_router

    app.include_router(socket_router)
    app.include_router(game_router)

    app.include_router(card_router)
    app.include_router(bunker_router)
    app.include_router(catastrophe_router)

    app.include_router(prepare_room_router)

    app.include_router(story_router)


include_routers()

create_data()
