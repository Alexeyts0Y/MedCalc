from fastapi import APIRouter

from schema.request.bmi_request_schema import BMIRequestSchema
from schema.response.response_schema import ResponseSchema
from service.calculator_service import CalculatorService


calculator_router = APIRouter()

@calculator_router.post("/bmi")
async def get_bmi(data: BMIRequestSchema) -> ResponseSchema:
    return CalculatorService.calculate_bmi(data=data)