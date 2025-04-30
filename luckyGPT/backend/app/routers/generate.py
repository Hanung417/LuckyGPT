from fastapi import APIRouter
from pydantic import BaseModel
from app.services.openai_service import generate_fortune

router = APIRouter()

class GenerateRequest(BaseModel):
    mbti: str
    mood: str
    weather: str

@router.post("/generate")
async def generate_fortune_api(data: GenerateRequest):
    try:
        
        result = generate_fortune(data.mbti, data.mood, data.weather)
        return result

    except Exception as e:
        print("🔥 GPT 오류:", e)
        return {
            "summary": "오류가 발생했습니다.",
            "advice": "다시 시도해보세요.",
            "caution": str(e)
        }