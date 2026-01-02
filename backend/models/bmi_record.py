from datetime import datetime
from sqlalchemy import Column, DateTime, Float, Integer, String
from db.database import Base


class BMIRecord(Base):
    __tablename__ = "bmi_records"

    id = Column(Integer, primary_key=True, index=True)
    weight = Column(Integer)
    height = Column(Integer)
    bmi_value = Column(Float)
    conclusion = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)