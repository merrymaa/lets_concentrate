from pydantic import BaseModel, EmailStr

class Token(BaseModel):
    token_access: str
    type_token: str

