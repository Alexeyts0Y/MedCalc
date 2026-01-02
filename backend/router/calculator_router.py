from fastapi import APIRouter, Depends

from db.database import get_db
from schema.request.bmi_request_schema import BMIRequestSchema
from schema.request.perfect_weight_request_schema import PerfectWeightRequestSchema
from schema.request.smoking_index_request_schema import SmokingIndexRequestSchema
from schema.request.tdee_request_schema import TDEERequestSchema
from schema.response.response_schema import ResponseSchema
from service.calculator_service import CalculatorService

from sqlalchemy.orm import Session

calculator_router = APIRouter()

@calculator_router.post("/bmi")
async def get_bmi(
    data: BMIRequestSchema, 
    db: Session = Depends(get_db)
) -> ResponseSchema:
    return CalculatorService.calculate_bmi(data=data, db=db)

@calculator_router.post("/smoking_index")
async def get_smoking_index(data: SmokingIndexRequestSchema) -> ResponseSchema:
    return CalculatorService.calclulate_smoking_index(data=data)

@calculator_router.post("/tdee")
async def get_tdee(data: TDEERequestSchema) -> ResponseSchema:
    return CalculatorService.calculate_tdee(data=data)

@calculator_router.post("/perfect_weight")
async def get_perfect_weight(data: PerfectWeightRequestSchema) -> ResponseSchema:
    return CalculatorService.calculate_perfect_weight(data=data)