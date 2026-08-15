from backend.app.db.repository_interface import Repository  
from database.database import SessionLocal, User
from uuid import uuid4

class RepositoryImpl(Repository):

    def __init__(self, session_factory=SessionLocal):
        self.session_factory = session_factory

    def add_user(self, email, hashed_password):
        session_db = self.session_factory()
        new_user = User(uuid=str(uuid4()), login=email, hashed_password=hashed_password)
        try:
            existing_user = session_db.query(User).filter(User.email == new_user.email).first()
            if existing_user:
                print(f"Пользователь с логином {new_user.email} уже существует")
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