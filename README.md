
# Инструкции:

``python -m venv venv``

``Set-ExecutionPolicy RemoteSigned -Scope Process``

``venv\Scripts\activate``

``pip install -r requirements.txt``

``uvicorn main:app --reload``

``npm run dev``


# Структура проекта
Приложение логически делится на три слоя: 

* база данных;
* серверная логика (бэкенд);
* пользовательский интерфейс (фронтенд);

## База данных (БД)

## Users (Пользователи):

* id (уникальный номер);
* email;
* hashed_password;
* created_at.


## Statistics (Статистика):

* id;
* user_id;
* session_date;
* timer_type;
* focus_time_sec;



## Backend (FastAPI)

* core/: настройки безопасности, секретные ключи;
* api/: роутеры (эндпоинты);
* auth/: (регистрация/вход); 
* database/: подключение к базе и модели SQLAlchemy;
* schemas/: модели Pydantic;
* main.py.

## Frontend (React + Vite)

* src/components/: переиспользуемые части интерфейса (кнопки, карточки таймера, поля ввода);
* src/pages/: экраны приложения (LoginPage, RegisterPage, DashboardPage со статистикой);
* src/services/: функции, которые обращаются к FastAPI (отправка запросов);
* src/hooks/: кастомная логика React;
* App.jsx: главный файл маршрутизации.

