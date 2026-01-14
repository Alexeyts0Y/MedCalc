from sqlalchemy.orm import Session
from sqlalchemy import func
from models.bmi_record import BMIRecord
from schema.response.city_stats_schema import CityStatsResponseSchema, CityStatsSchema

class StatsService:

    @staticmethod
    def get_bmi_statistics(db: Session) -> CityStatsResponseSchema:
        records = db.query(BMIRecord).all()
        
        total_count = len(records)

        if total_count == 0:
            return CityStatsResponseSchema(
                total_users=0, 
                average_bmi=0.0, 
                overall_category_distribution={},
                city_statistics=[]
            )
        
        total_bmi = sum(record.bmi_value for record in records)
        avg_bmi = round(total_bmi / total_count, 2)
        
        overall_distribution = {}
        for record in records:
            cat = record.conclusion
            overall_distribution[cat] = overall_distribution.get(cat, 0) + 1
        
        city_stats = []
        
        cities_query = db.query(BMIRecord.city).filter(BMIRecord.city.isnot(None)).distinct().all()
        cities = [city[0] for city in cities_query]
        
        for city in cities:
            city_records = db.query(BMIRecord).filter(BMIRecord.city == city).all()
            city_count = len(city_records)
            
            city_distribution = {}
            city_total_bmi = 0
            
            for record in city_records:
                cat = record.conclusion
                city_distribution[cat] = city_distribution.get(cat, 0) + 1
                city_total_bmi += record.bmi_value
            
            city_avg_bmi = round(city_total_bmi / city_count, 2) if city_count > 0 else 0
            
            city_stats.append(CityStatsSchema(
                city=city,
                total_users=city_count,
                category_distribution=city_distribution,
                average_bmi=city_avg_bmi
            ))
        
        city_stats.sort(key=lambda x: x.total_users, reverse=True)
        
        return CityStatsResponseSchema(
            total_users=total_count,
            average_bmi=avg_bmi,
            overall_category_distribution=overall_distribution,
            city_statistics=city_stats
        )