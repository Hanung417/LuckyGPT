from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import generate
from app.routers import auth

app = FastAPI()

# CORS 설정 (프론트 연결 허용)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 개발 중에는 모두 허용
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 등록
app.include_router(generate.router)
app.include_router(auth.router)