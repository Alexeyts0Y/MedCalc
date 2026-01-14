from typing import Optional
from pydantic import BaseModel, Field

class BMIRequestSchema(BaseModel):
    weight: int = Field(ge=1)
    height: int = Field(ge=1, le=260)
    city: Optional[str] = Field(None, max_length=100)