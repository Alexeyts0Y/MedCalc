from pydantic import BaseModel, Field


class ReponseSchema(BaseModel):
    result: float = Field(ge=0.0)
    conclusion: str