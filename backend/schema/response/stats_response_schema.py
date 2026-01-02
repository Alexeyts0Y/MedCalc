from pydantic import BaseModel
from typing import Dict

class StatsResponseSchema(BaseModel):
    total_users: int
    average_bmi: float
    category_distribution: Dict[str, int]