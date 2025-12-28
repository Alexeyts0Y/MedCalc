from pydantic import Field
from typing import Literal

from schema.request.bmi_request_schema import BMIRequestSchema

class TDEERequestSchema(BMIRequestSchema):
    age: int = Field(ge=1, le=150)
    gender: Literal["male", "female"]
    activity_level: Literal["minimum", "low", "middle", "high", "extreme"]