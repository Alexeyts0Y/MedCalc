from pydantic import Field

from schema.request.bmi_request_schema import BMIRequestSchema

class BMRRequestSchema(BMIRequestSchema):
    age: int = Field(ge=1, le=150)