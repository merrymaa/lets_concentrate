from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.database import init_db

from app.api.routes import router

app = FastAPI(title="Concentrator")

# @app.on_event("startup") 
async def connect_to_db():
    print("Пытаюсь подключиться к базе данных...")
    try:
        init_db() 
        print("Подключение успешно!")
    except Exception as e:
        with open("db_error.log", "w", encoding="utf-8") as f:
            f.write(str(e))
        print(f"Ошибка базы данных! Подробности сохранены в db_error.log")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

