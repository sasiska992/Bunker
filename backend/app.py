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
    from src.cards.view import router as card_router
    from src.game.rooms import router as game_router
    from src.game.sockets import router as socket_router
    from src.game.bunker import router as bunker_router
    from src.game.catastrophe import router as catastrophe_router

    app.include_router(socket_router)
    app.include_router(card_router)
    app.include_router(game_router)
    app.include_router(bunker_router)
    app.include_router(catastrophe_router)


# if __name__ == "__main__":
#     import uvicorn
#
#     include_routers()
#
#     app.add_middleware(
#         CORSMiddleware,
#         allow_origins=origins,
#         allow_credentials=True,
#         allow_methods=["*"],
#         allow_headers=["*"],
#     )
#     uvicorn.run(app, host="127.0.0.1", port=8000, workers=1)

include_routers()

create_data()

# uvicorn.run(app, host="127.0.0.1", port=8000, workers=1)
