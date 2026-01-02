from sqlalchemy.orm import Session

from models.bmi_record import BMIRecord
from schema.response.stats_response_schema import StatsResponseSchema

class StatsService:

    @staticmethod
    def get_bmi_statistics(db: Session) -> StatsResponseSchema:
        records = db.query(BMIRecord).all()
        
        total_count = len(records)

        if total_count == 0:
            return StatsResponseSchema(
                total_users=0, 
                average_bmi=0.0, 
                category_distribution={}
            )
        
        total_bmi = sum(record.bmi_value for record in records)
        avg_bmi = round(total_bmi / total_count, 2)

        distribution = {}
        for record in records:
            cat = record.conclusion
            if cat in distribution:
                distribution[cat] += 1
            else:
                distribution[cat] = 1
                
        return StatsResponseSchema(
            total_users=total_count,
            average_bmi=avg_bmi,
            category_distribution=distribution
        )