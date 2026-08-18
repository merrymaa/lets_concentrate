from sqlalchemy import create_engine, String, Column, DateTime, Integer
from sqlalchemy.orm import DeclarativeBase, Mapped, sessionmaker


# pas = "123456789"

DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/concentrate"
engine = create_engine(DATABASE_URL, echo=False, client_encoding='utf8')


class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"

    uuid: Mapped[str] = Column(String(40), primary_key=True, nullable=False)
    email: Mapped[str] = Column(String(40), nullable=False)
    hashed_password: Mapped[str] = Column(String(255), nullable=False)
    data_created = Column(DateTime, nullable=False)

class Statistics(Base):
    __tablename__ = "statistics"

    uuid: Mapped[str] = Column(String(40), primary_key=True, nullable=False)
    user: Mapped[str] = Column(String, nullable=True)
    session_date = Column(DateTime, nullable=False)
    type_timer: Mapped[str] = Column(String, nullable=False)
    focus_time_sec = Column(Integer, nullable=False)


def init_db():
    Base.metadata.create_all(engine)


SessionLocal = sessionmaker(bind=engine)


