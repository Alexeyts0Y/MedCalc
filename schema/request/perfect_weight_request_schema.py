from pydantic import BaseModel, Field
from typing import Literal

from schema.request.bmi_request_schema import BMIRequestSchema

class PerfectWeightRequestSchema(BaseModel):
    gender: Literal["male", "female"]
    height: int = Field(ge=1, le=260)