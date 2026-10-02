from fastapi import APIRouter, HTTPException, status
from fastapi.responses import HTMLResponse
from schemas.user_register import UserRegister
from di.container import container

router = APIRouter()


@router.get("/", status_code=200)
def start_page():
    html_content = f"<h2> Hello friend </h2>"
    return HTMLResponse(content=html_content)

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(user_data: UserRegister):
    email = user_data.email
    password = user_data.password
    try:
        success = container.repository.register_user(email, password)

        if success:
            return {"message": f"{email} was successful registered"}, 201
        else:
            return {"error": "Login exists"}, 409

    except Exception as e:
        return {"error": f"Internal server error during registration - {e}"}, 500

   




