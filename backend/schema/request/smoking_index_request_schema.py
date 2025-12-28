from pydantic import BaseModel, Field


class SmokingIndexRequestSchema(BaseModel):
    years: int = Field(ge=1, le=100)
    cigarette_count: int = Field(ge=0)