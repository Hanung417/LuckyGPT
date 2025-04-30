from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_fortune(mbti: str, mood: str, weather: str):
    prompt = f"""
당신은 운세와 감정 분석에 능한 전문 상담가입니다.

사용자의 정보는 다음과 같습니다:
- MBTI: {mbti}
- 기분: {mood}
- 날씨: {weather}

위 정보를 종합적으로 고려하여, 오늘 하루에 대한 정서적 조언과 운세를 아래 형식으로 작성해 주세요.
말투는 너무 딱딱하지 않게, 공감 가는 말투로 작성해 주세요.

1. 오늘의 운세 요약 (한 문장)
2. 오늘 추천하는 행동 (예: 음악 듣기, 산책, 대화 등)
3. 주의해야 할 점 (기분과 날씨로 인해 생길 수 있는 심리적 함정 포함)
4. 짧은 응원 메시지 (한 문장, 긍정적이고 따뜻하게)
"""

    chat_completion = client.chat.completions.create(
        model="gpt-3.5-turbo",  # 또는 "gpt-4"
        messages=[
            {"role": "system", "content": "너는 따뜻한 말투의 운세 상담사야."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7,
        max_tokens=500,
    )

    result = chat_completion.choices[0].message.content
    lines = result.strip().split('\n')

    # 초기화
    summary, advice, caution, encouragement = '', '', '', ''

    # 프롬프트 형식 기반으로 항목 파싱
    for line in lines:
        if '운세 요약' in line or line.strip().startswith("1."):
            summary = line.replace("1.", "").replace("오늘의 운세 요약", "").strip(': ').strip()
        elif '추천' in line or line.strip().startswith("2."):
            advice = line.replace("2.", "").replace("오늘 추천하는 행동", "").strip(': ').strip()
        elif '주의' in line or line.strip().startswith("3."):
            caution = line.replace("3.", "").replace("주의해야 할 점", "").strip(': ').strip()
        elif '응원' in line or line.strip().startswith("4."):
            encouragement = line.replace("4.", "").replace("응원 메시지", "").strip(': ').strip()

    return {
        "summary": summary,
        "advice": advice,
        "caution": caution,
        "encouragement": encouragement
    }
