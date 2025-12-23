from fastapi import APIRouter

from schema.request.bmi_request_schema import BMIRequestSchema
from schema.request.smoking_index_request_schema import SmokingIndexRequestSchema
from schema.response.response_schema import ResponseSchema
from service.calculator_service import CalculatorService


calculator_router = APIRouter()

@calculator_router.post("/bmi")
async def get_bmi(data: BMIRequestSchema) -> ResponseSchema:
    return CalculatorService.calculate_bmi(data=data)

@calculator_router.post("/smoking_index")
async def get_smoking_index(data: SmokingIndexRequestSchema) -> ResponseSchema:
    return CalculatorService.calclulate_smoking_index(data=data)