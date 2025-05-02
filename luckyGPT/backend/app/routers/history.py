import json
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException
from app.database import get_db
from app.models.history import History
from app.services.deps import get_current_user
from app.models.user import User
from datetime import datetime

router = APIRouter()

# 히스토리 저장 함수
def save_fortune_to_db(db: Session, user_id: int, mbti: str, mood: str, weather: str, result: dict):
    try:
        # result를 JSON으로 직렬화
        result_str = json.dumps(result)

        # 새로운 History 객체 생성
        history = History(
            user_id=user_id,
            mbti=mbti,
            mood=mood,
            weather=weather,
            result=result_str,  # 직렬화된 결과 저장
            created_at=datetime.utcnow()
        )

        # DB에 저장
        db.add(history)
        db.commit()

    except Exception as e:
        db.rollback()  # 에러 발생 시 롤백
        print(f"Error saving fortune: {e}")

# 히스토리 조회 함수
@router.get("/history")
def get_user_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    records = db.query(History)\
        .filter(History.user_id == current_user.id)\
        .order_by(History.created_at.desc())\
        .all()

    return [
        {
            "id": r.id,
            "mbti": r.mbti,
            "mood": r.mood,
            "weather": r.weather,
            "result": json.loads(r.result.replace("'", '"')),   # result를 객체로 파싱
            "created_at": r.created_at
        }
        for r in records
    ]
