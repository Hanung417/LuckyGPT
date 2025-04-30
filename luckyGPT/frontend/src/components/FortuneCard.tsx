import React from 'react';

export default function FortuneCard({ summary, advice, caution, encouragement }: any) {
  return (
    <div className="bg-white border rounded-xl p-4 shadow-md">
      <h2 className="text-xl font-bold mb-2">🧠 오늘의 운세</h2>
      <p><strong>오늘의 운세 요약:</strong> {summary}</p>
      <p><strong>오늘의 추천 행동:</strong> {advice}</p>
      <p><strong>오늘의 주의해야 할 점:</strong> {caution}</p>
      <p className="mt-2 text-indigo-600 italic"><strong>💬 응원 메시지:</strong> {encouragement}</p>
    </div>
  );
}