from fastapi import APIRouter
from router.stats_router import stats_router
from router.calculator_router import calculator_router

api_router = APIRouter()

api_router.include_router(calculator_router, prefix="/api")
api_router.include_router(stats_router, prefix="/api")