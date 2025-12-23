from pydantic import BaseModel, Field


class SmokingIndexRequestSchema(BaseModel):
    years: int = Field(ge=1, le=100)
    package_count: int = Field(ge=1)