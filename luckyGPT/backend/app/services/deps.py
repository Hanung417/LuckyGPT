from fastapi import Depends, HTTPException, status
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.user import User
from app.services.auth_utils import decode_access_token
import os
from dotenv import load_dotenv

load_dotenv()

# DB 세션 주입
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 로그인된 사용자 가져오기
def get_current_user(token: str = Depends(lambda: None), db: Session = Depends(get_db)) -> User:
    from fastapi.security import OAuth2PasswordBearer
    oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")  # login 엔드포인트에서 토큰 발급

    token = oauth2_scheme()
    try:
        payload = decode_access_token(token)
        if payload is None or "sub" not in payload:
            raise HTTPException(status_code=401, detail="토큰이 유효하지 않습니다.")
        email: str = payload.get("sub")
    except JWTError:
        raise HTTPException(status_code=401, detail="토큰 디코딩 실패")

    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise HTTPException(status_code=404, detail="사용자를 찾을 수 없습니다.")

    return user
