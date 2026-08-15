from abc import ABC, abstractmethod
from database.database import User


class Repository(ABC):
   
    @abstractmethod
    def add_user(self, email: str, hashed_password: str) -> bool:
        pass

