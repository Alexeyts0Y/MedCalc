from pydantic import BaseModel
from typing import Dict, List, Optional

class CityStatsSchema(BaseModel):
    city: str
    total_users: int
    category_distribution: Dict[str, int]
    average_bmi: Optional[float] = None

class CityStatsResponseSchema(BaseModel):
    total_users: int
    average_bmi: float
    overall_category_distribution: Dict[str, int]
    city_statistics: List[CityStatsSchema]