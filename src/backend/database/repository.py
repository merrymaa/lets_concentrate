from abc import ABC
from database.database import User

from typing import Optional


class Repository(ABC):
    

    def register_user(self, email: str, hashed_password: str) -> bool:
       pass

    def get_user_by_email(self, email: str) -> Optional[User]: 
       pass

         
    def get_user_by_id(self, user_uuid: str) -> Optional[User]: 
        pass



