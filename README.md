# LuckyGPT - AI 기반 운세 생성 서비스
LuckyGPT는 사용자의 MBTI, 기분, 날씨 정보를 바탕으로 AI가 운세를 생성하고 이를 사용자에게 제공하는 서비스입니다. 사용자는 로그인 후, 자신의 기분과 MBTI를 선택하고, 현재 날씨를 반영하여 AI가 생성한 운세를 확인할 수 있습니다. 이 서비스는 사용자 맞춤형 운세와 응원 메시지를 제공하며, 모든 운세 기록은 히스토리로 저장되어 나중에 다시 볼 수 있습니다.

기능
운세 생성

사용자는 자신의 MBTI와 현재 기분을 선택하여 AI가 생성하는 운세를 받을 수 있습니다.

운세는 사용자의 기분, MBTI, 날씨를 기반으로 한 맞춤형 예측을 제공합니다.

운세 기록 조회

사용자는 이전에 받은 운세 기록을 조회할 수 있습니다.

운세 기록은 날짜, MBTI, 기분, 날씨, 운세 요약, 추천 사항, 주의 사항, 응원 메시지를 포함합니다.

로그인 / 로그아웃 기능

사용자는 자신의 계정으로 로그인하고, 로그아웃할 수 있습니다.

날씨 정보 반영

사용자의 위치를 기반으로 실시간 날씨 정보를 가져와 운세 생성에 반영합니다.

설치 및 실행
1. 백엔드 (FastAPI)
의존성 설치
프로젝트 루트 디렉토리에서 requirements.txt에 명시된 의존성을 설치합니다.

pip install -r requirements.txt
데이터베이스 초기화
데이터베이스를 초기화하려면 init_db.py 파일을 실행합니다. 이 파일은 데이터베이스와 테이블을 초기화합니다.

python init_db.py
백엔드 서버 실행
백엔드 서버를 실행합니다.

uvicorn app.main:app --reload
API 엔드포인트

/generate: 운세를 생성하는 엔드포인트 (POST)

/history: 사용자의 운세 기록을 조회하는 엔드포인트 (GET)

/signup: 사용자 회원가입 (POST)

/login: 사용자 로그인 (POST)

2. 프론트엔드 (React)
의존성 설치
프론트엔드 디렉토리로 이동하여 필요한 의존성을 설치합니다.

cd frontend
npm install
프론트엔드 서버 실행
프론트엔드 서버를 실행합니다.

npm run dev
서버가 실행되면 브라우저에서 http://localhost:3000 주소로 접근할 수 있습니다.

3. 환경 변수 설정
다음과 같은 환경 변수를 .env 파일에 설정합니다:

SECRET_KEY=your_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
DATABASE_URL=sqlite:///./sql_app.db
WEATHER_API_KEY=your_weather_api_key_here
SECRET_KEY: JWT 토큰 서명에 사용되는 비밀 키

ALGORITHM: JWT 토큰 서명 알고리즘

ACCESS_TOKEN_EXPIRE_MINUTES: 토큰 만료 시간

DATABASE_URL: 데이터베이스 URL

WEATHER_API_KEY: 날씨 API 키 (예: OpenWeatherMap API)

사용법
회원가입
/signup 엔드포인트를 통해 회원가입을 합니다. 이메일과 비밀번호를 입력하여 사용자 계정을 생성할 수 있습니다.

로그인
/login 엔드포인트를 통해 로그인합니다. 로그인 후, access_token을 받아서 후속 API 요청에 사용합니다.

운세 생성
로그인 후, /generate 엔드포인트를 사용하여 MBTI와 기분을 선택하고, 현재 날씨 정보를 바탕으로 운세를 생성합니다. 운세는 요약, 추천 행동, 주의 사항, 응원 메시지를 포함합니다.

운세 기록 조회
/history 엔드포인트를 사용하여 로그인한 사용자의 운세 기록을 조회할 수 있습니다.

기술 스택
백엔드: FastAPI, SQLAlchemy, SQLite

프론트엔드: React, Tailwind CSS, Axios

AI: OpenAI API (운세 생성)

디렉토리 구조
.
├── backend
│   ├── app
│   │   ├── main.py            # FastAPI 서버
│   │   ├── models             # 데이터베이스 모델
│   │   ├── routers            # API 엔드포인트
│   │   └── services           # API 로직
│   └── init_db.py             # DB 초기화
└── frontend
    ├── src
    │   ├── components         # React 컴포넌트
    │   ├── pages              # 페이지 컴포넌트
    │   ├── api                # Axios 요청
    │   └── utils              # 유틸리티 함수
    └── public
        ├── index.html
        └── assets
향후 개선 사항
운세 정확도 향상: 현재의 운세 생성 모델을 개선하여 더 정확한 예측을 제공할 수 있도록 노력할 예정입니다.

사용자 맞춤형 서비스 추가: 사용자의 이전 운세 결과를 분석하여 더 개인화된 운세 제공 기능을 추가할 계획입니다.

다양한 날씨 정보 제공: 날씨 정보의 세부 항목을 확장하여 운세 예측에 더 많은 요소를 반영할 예정입니다.

