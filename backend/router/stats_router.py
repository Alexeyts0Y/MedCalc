from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from db.database import get_db
from schema.response.stats_response_schema import StatsResponseSchema
from service.stats_service import StatsService

stats_router = APIRouter()

@stats_router.get("/stats", response_model=StatsResponseSchema)
async def get_stats(db: Session = Depends(get_db)):
    return StatsService.get_bmi_statistics(db=db)