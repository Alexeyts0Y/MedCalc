from schema.request.bmi_request_schema import BMIRequestSchema
from schema.request.perfect_weight_request_schema import PerfectWeightRequestSchema
from schema.request.smoking_index_request_schema import SmokingIndexRequestSchema
from schema.request.tdee_request_schema import TDEERequestSchema
from schema.response.response_schema import ResponseSchema

class CalculatorService:
    
    @staticmethod
    def calculate_bmi(data: BMIRequestSchema) -> ResponseSchema:
        bmi: float =  data.weight / (data.height * 0.01) ** 2
        message: str = ""
        conclusion: str = ""
        
        if bmi < 18.5:
            conclusion = "Дефицит массы тела"
            message = "Рекомендуется проконсультироваться с врачом для выявления \
                       причин и подбора высококалорийного, богатого питательными \
                       веществами рациона для безопасного набора веса."
        elif bmi >= 18.5 and bmi <= 24.9:
            conclusion = "Нормальная масса тела"
            message = "Ваш вес соответствует росту. Для поддержания здоровья \
                       рекомендуется придерживаться сбалансированного питания \
                       и регулярной физической активности."
        elif bmi >= 25.0 and bmi <= 29.9:
            conclusion = "Избыточная масса тела (предожирение)"
            message = "Рекомендуется пересмотреть питание, увеличить ежедневную \
                       активность (например, ходьбу) для предотвращения перехода \
                       в стадию ожирения и снижения рисков для здоровья."
        elif bmi >= 30.0 and bmi <= 34.9:
            conclusion = "Ожирение I степени"
            message = "Рекомендуется обратиться к врачу (диетологу, эндокринологу) \
                       для составления индивидуального плана коррекции веса под \
                       контролем специалиста."
        elif bmi >= 35.0 and bmi <= 39.9:
            conclusion = "Ожирение II степени"
            message = "	Настоятельно рекомендуется обратиться за помощью к врачу. \
                        Снижение веса под медицинским наблюдением критически важно \
                        для уменьшения риска сердечно-сосудистых заболеваний, диабета \
                        и других осложнений."
        else:
            conclusion = "Ожирение III степени (морбидное)"
            message = "Требуется обязательная консультация с врачом (бариатром, эндокринологом). \
                       Лечение часто требует комплексного медицинского подхода, включая возможные \
                       терапевтические и хирургические методы."
        
        return ResponseSchema(result=bmi, conclusion=conclusion, recommendation=message)
    
    @staticmethod
    def calclulate_smoking_index(data: SmokingIndexRequestSchema) -> ResponseSchema:
        SI: float = data.cigarette_count * data.years / 20
        conclusion: str = ""
        message: str = ""

        if SI < 10:
            conclusion = "Фактор риска, но риск развития ХОБЛ (хронической обструктивной болезни лёгких) ниже."
            message = "	Это значимый фактор риска. Настоятельно рекомендуется отказаться от курения. \
                        Сейчас — лучшее время, чтобы остановить прогрессирование повреждений и значительно \
                        снизить риски для здоровья в будущем."
        elif SI >= 10:
            conclusion = "Пороговое значение. Достоверный и значимый фактор риска развития ХОБЛ, рака лёгких и сердечно-сосудистых заболеваний."
            message = "	Необходима консультация врача (пульмонолога, терапевта). Риск развития ХОБЛ, рака \
                        лёгких и сердечно-сосудистых заболеваний высок. Рекомендуется пройти обследование \
                        (например, спирометрию) и обсудить с врачом стратегию отказа от курения и \
                        дальнейшего наблюдения"
        else:
            conclusion = "Высокий риск. Часто сопряжён с видимыми изменениями на КТ лёгких и выраженными симптомами."
            message = "Требуется срочное обращение к врачу для углубленного обследования. \
                       Вероятны уже имеющиеся изменения в лёгких. Крайне важно полностью \
                       отказаться от курения и пройти назначенные исследования (КТ органов грудной клетки, \
                       оценку функции внешнего дыхания) для определения тактики лечения."
        
        return ResponseSchema(result=SI, conclusion=conclusion, recommendation=message)
    
    @staticmethod
    def calculate_tdee(data: TDEERequestSchema) -> ResponseSchema:
        BMR: float = 0
        TDEE: float = 0
        conclusion: str = ""

        if data.gender == "male":
            BMR = (10 * data.weight) + (6.25 * data.height) - (5 * data.age) + 5
        else:
            BMR = (10 * data.weight) + (6.25 * data.height) - (5 * data.age) - 161

        lvl: str = data.activity_level

        if lvl == "minimum":
            TDEE = BMR * 1.2
        elif lvl == "low":
            TDEE = BMR * 1.375
        elif lvl == "middle":
            TDEE = BMR * 1.55
        elif lvl == "high":
            TDEE = BMR * 1.725
        else:
            TDEE = BMR * 1.9
        
        conclusion = "Это оптимальное кол-во ккал в день, которые \
                       рекомендуется употреблять с учетом вашего образа жизни"
        
        return ResponseSchema(result=TDEE, conclusion=conclusion)
    
    @staticmethod
    def calculate_perfect_weight(data: PerfectWeightRequestSchema) -> ResponseSchema:
        perfect_weight: float = 0
        if data.gender == "male":
            perfect_weight = 50 + 0.91 * (data.height - 152.4)
        else:
            perfect_weight = 45.5 + 0.91 * (data.height - 152.4)
        
        conclusion: str = "Это оптимальный вес для вашего роста"

        return ResponseSchema(result=perfect_weight, conclusion=conclusion)