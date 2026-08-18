from fastapi import APIRouter, HTTPException, status
from fastapi.responses import HTMLResponse
from app.schemas.user_register import UserRegister

router = APIRouter()


@router.get("/", status_code=200)
def start_page():
    html_content = f"<h2> Hello friend </h2>"
    return HTMLResponse(content=html_content)

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(user_data: UserRegister):
    email = user_data.email
    password = user_data.password

    print(f"=== email: {email}, password: {password} ")



    return {"message": f"Пользователь c плчтой {email} зарегистрирован"}





