from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.services.openai_service import generate_fortune
from app.database import get_db
from app.models.history import History
from app.models.user import User
from app.services.deps import get_current_user

router = APIRouter()

class GenerateRequest(BaseModel):
    mbti: str
    mood: str
    weather: str

@router.post("/generate")
async def generate_fortune_api(
    data: GenerateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        # 운세 생성
        result = generate_fortune(data.mbti, data.mood, data.weather)

        # DB에 기록
        history = History(
            user_id=current_user.id,
            mbti=data.mbti,
            mood=data.mood,
            weather=data.weather,
            result=str(result)
        )
        db.add(history)
        db.commit()

        return result

    except Exception as e:
        print("🔥 GPT 오류:", e)
        return {
            "summary": "오류가 발생했습니다.",
            "advice": "다시 시도해보세요.",
            "caution": str(e)
        }
