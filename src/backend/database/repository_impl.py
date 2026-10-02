from uuid import uuid4
from datetime import datetime
from sqlalchemy.exc import SQLAlchemyError
from database.database import User, SessionLocal
from database.repository import Repository
from typing import Optional


class RepositoryImpl(Repository):
    def __init__(self, session_factory=SessionLocal):
        self.session_factory = session_factory

    def register_user(self, email: str, hashed_password: str) -> bool:
        session_db = self.session_factory()

        new_user = User(uuid=str(uuid4()), email=email, hashed_password=hashed_password, data_created=datetime.now())
        try:
            existing_user = session_db.query(User).filter(User.email == new_user.email).first()
            if existing_user:
                print(f"Пользователь с почтой {new_user.email} уже существует")
                return False
            session_db.add(new_user)
            session_db.commit()
            print(f"Пользователь с логином {new_user.email} добавлен в БД")
            return True
        except Exception as e:
            session_db.rollback()
            print(f"Ошибка при сохранении пользователя в БД: {e}")
            raise
        finally:
            session_db.close()

    def get_user_by_email(self, email: str) -> Optional[User]: 
        """ Ищет пользователя в БД по email. Возвращает объект User, если найден, или None, если не найден. """ 
        session_db = self.session_factory() 
        try: 
            user = session_db.query(User).filter(User.email == email).first() 
            return user 
        except SQLAlchemyError as e: 
            print(f"Ошибка при запросе пользователя {email}: {e}") 
            return None 
        finally: session_db.close()

         
    def get_user_by_id(self, user_uuid: str) -> Optional[User]: 
        """ Ищет пользователя в БД по UUID. """ 
        session_db = self.session_factory() 

        try: 
            user = session_db.query(User).filter(User.uuid == user_uuid).first() 
            return user 
        except SQLAlchemyError as e: 
            print(f"Ошибка при запросе пользователя {user_uuid}: {e}") 
            return None 
        finally: session_db.close()



