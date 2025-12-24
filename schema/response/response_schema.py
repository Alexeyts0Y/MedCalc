from typing import Optional
from pydantic import BaseModel, Field


class ResponseSchema(BaseModel):
    result: float = Field(ge=0.0)
    conclusion: str
    recommendation: Optional[str] = None