import os

from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from api.routes import router
from database.database import init_db



@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Пытаюсь подключиться к базе данных...")
    try:
        init_db()
        print("Подключение успешно!")
    except Exception as e:
        with open("db_error.log", "w", encoding="utf-8") as f:
            f.write(str(e))
        print(f"Ошибка базы данных! Подробности сохранены в db_error.log")
    yield

app = FastAPI(title="Concentrator", lifespan=lifespan)

# app = FastAPI(title="Concentrator")

# async def connect_to_db():
#     print("Пытаюсь подключиться к базе данных...")
#     try:
#         init_db() 
#         print("Подключение успешно!")
#     except Exception as e:
#         with open("db_error.log", "w", encoding="utf-8") as f:
#             f.write(str(e))
#         print(f"Ошибка базы данных! Подробности сохранены в db_error.log")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

# http://localhost:8000/
