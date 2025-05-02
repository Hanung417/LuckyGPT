# 🧿 LuckyGPT: 나만의 운세 생성기

**LuckyGPT**는 MBTI, 기분, 날씨에 기반하여 맞춤형 운세를 제공하는 웹 애플리케이션입니다. GPT 모델을 사용하여 각 사용자의 기분과 상태에 맞는 운세를 생성하고, 이를 데이터베이스에 저장하여 히스토리로 추적할 수 있습니다.

## 🚀 기능

- **운세 생성**: 사용자의 MBTI, 기분, 날씨를 기반으로 운세 요약, 추천 행동, 주의 사항, 응원 메시지 등을 생성합니다.
- **운세 히스토리**: 생성된 운세를 저장하고 언제든지 조회할 수 있습니다.
- **사용자 인증**: 로그인 및 회원가입 기능을 제공하여 개인화된 경험을 지원합니다.

## 🖥️ 기술 스택

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: FastAPI, SQLAlchemy
- **Database**: SQLite (변경 예정)
- **Authentication**: JWT (JSON Web Token)
- **Weather API**: KMA (Korean Meteorological Administration)

## 📸 화면 미리보기

![운세 예시](https://via.placeholder.com/600x300?text=운세+미리보기)

## 🏃‍♂️ 실행 방법

1. **백엔드 실행**

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
프론트엔드 실행

bash
복사
cd frontend
npm install
npm start
운세 생성: 로그인 후, MBTI, 기분, 날씨를 선택하고 "운세 생성" 버튼을 클릭하여 운세를 생성하세요.

📦 배포 환경
Frontend: Vercel에 배포 중

Backend: Heroku에 배포 중

Database: 로컬 SQLite (현재 클라우드 DB 변경 예정)

🛠️ 설치 및 사용법
리포지토리 클론

bash
복사
git clone https://github.com/yourusername/luckygpt.git
cd luckygpt
백엔드 및 프론트엔드 설정

bash
복사
cd backend
pip install -r requirements.txt  # 백엔드 의존성 설치

cd frontend
npm install  # 프론트엔드 의존성 설치
애플리케이션 실행

백엔드: uvicorn app.main:app --reload

프론트엔드: npm start

🔑 기능 설명
1. 운세 생성
운세 생성은 사용자의 MBTI, 기분, 날씨 정보를 바탕으로 AI가 운세를 생성합니다. 예를 들어, "기쁨" 기분을 선택하면 기쁨에 맞는 운세 요약과 추천 행동을 제공합니다.

2. 히스토리
모든 운세는 데이터베이스에 저장되어, 언제든지 이전 운세를 조회할 수 있습니다. 각 운세는 날짜와 함께 기록됩니다.
