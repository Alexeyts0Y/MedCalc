from fastapi import APIRouter
from router.calculator_router import calculator_router

api_router = APIRouter()

api_router.include_router(calculator_router, prefix="/calculator")