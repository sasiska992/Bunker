from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Определите функцию для включения маршрутизатора
def include_routers():
    from src.cards.view import router as card_router
    app.include_router(card_router)


if __name__ == "__main__":
    import uvicorn

    include_routers()
    uvicorn.run(app, host="127.0.0.1", port=8000)
