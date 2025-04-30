import React from 'react';

export default function FortuneCard({ summary, advice, caution }: any) {
  return (
    <div className="bg-white border rounded-xl p-4 shadow-md">
      <h2 className="text-xl font-bold mb-2">🧠 오늘의 운세</h2>
      <p><strong>요약:</strong> {summary}</p>
      <p><strong>추천:</strong> {advice}</p>
      <p><strong>주의:</strong> {caution}</p>
    </div>
  );
}
