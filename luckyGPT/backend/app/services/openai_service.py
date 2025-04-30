from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_fortune(mbti: str, mood: str, weather: str):
    prompt = f"""
당신은 {mbti} 유형이고, 기분은 '{mood}', 날씨는 {weather}입니다.

당신은 운세 전문가로서 다음 형식에 맞춰 운세를 작성하세요. 반드시 각 항목은 한 줄씩 작성하세요:

1. 요약:
2. 추천 행동:
3. 주의 사항:
"""

    chat_completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "당신은 친절한 운세 전문가입니다."},
            {"role": "user", "content": prompt},
        ],
        temperature=0.7,
    )

    result = chat_completion.choices[0].message.content
    lines = result.strip().split('\n')

    summary, advice, caution = '', '', ''
    for line in lines:
        if line.lower().startswith('1') or '요약' in line:
            summary = line.replace("1.", "").replace("요약:", "").strip()
        elif line.lower().startswith('2') or '추천' in line:
            advice = line.replace("2.", "").replace("추천 행동:", "").strip()
        elif line.lower().startswith('3') or '주의' in line:
            caution = line.replace("3.", "").replace("주의 사항:", "").strip()

    return {
        "summary": summary,
        "advice": advice,
        "caution": caution,
    }