from sqlalchemy import create_engine, String, DateTime, Integer
from sqlalchemy.orm import DeclarativeBase, Mapped, sessionmaker
from sqlalchemy.orm import mapped_column
from datetime import datetime

# pas = "123456789"

DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/concentrate"
engine = create_engine(DATABASE_URL, echo=True, client_encoding='utf8')


class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"

    uuid: Mapped[str] = mapped_column(String(40), primary_key=True)
    email: Mapped[str] = mapped_column(String(40), nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    data_created: Mapped[datetime] = mapped_column(DateTime, nullable=False)

class Statistics(Base):
    __tablename__ = "statistics"

    uuid: Mapped[str] = mapped_column(String(40), primary_key=True)
    user: Mapped[str | None] = mapped_column(String, nullable=True)
    session_date: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    type_timer: Mapped[str] = mapped_column(String, nullable=False)
    focus_time_sec: Mapped[int] = mapped_column(Integer, nullable=False)
    count_distraction: Mapped[int] = mapped_column(Integer, nullable=False)
    


def init_db():
    # print("Start init_db")
    Base.metadata.create_all(engine)
    # print("End init_db")


SessionLocal = sessionmaker(bind=engine)


