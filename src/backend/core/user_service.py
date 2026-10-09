from abc import ABC, abstractmethod

class UserService(ABC):

    def register_user(self, email: str, password: str) -> bool:
        pass

    def authorize(self, jwt_request: JwtRequest) -> JwtResponse | None:
        pass