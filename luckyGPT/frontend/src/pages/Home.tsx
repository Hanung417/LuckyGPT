import axios from '../api/axios';
import React, { useState } from 'react';
import FortuneCard from '../components/FortuneCard';

const mbtiList = ['INTP', 'INFP', 'ENFP', 'ISTJ', 'ENTJ', 'ISFJ', 'ESFP'];

const moods = [
  { emoji: '😄', label: '기쁨' },
  { emoji: '😐', label: '평범함' },
  { emoji: '😞', label: '우울함' },
  { emoji: '😡', label: '분노' },
];

export default function Home() {
  const [mbti, setMbti] = useState('');
  const [mood, setMood] = useState('');
  const [fortune, setFortune] = useState<any | null>(null);

  const handleGenerateFortune = async () => {
    try {
      const response = await axios.post('/generate', {
        mbti,
        mood,
        weather: '흐림, 10도', // 현재는 하드코딩, 나중에 날씨 API로 자동화
      });
  
      setFortune(response.data);
    } catch (error) {
      console.error('운세 생성 실패:', error);
      alert('운세 생성 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🎯 LuckyGPT - 오늘의 운세</h1>

      <label className="block mb-2">MBTI 선택:</label>
      <select
        className="w-full p-2 border rounded mb-4"
        value={mbti}
        onChange={(e) => setMbti(e.target.value)}
      >
        <option value="">선택하세요</option>
        {mbtiList.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>

      <label className="block mb-2">오늘 기분:</label>
      <div className="flex gap-2 mb-4">
        {moods.map((m) => (
          <button
            key={m.label}
            className={`p-2 rounded border ${
              mood === m.label ? 'bg-blue-200' : ''
            }`}
            onClick={() => setMood(m.label)}
          >
            {m.emoji}
          </button>
        ))}
      </div>

      <button
        className="bg-purple-500 text-white px-4 py-2 rounded w-full"
        onClick={handleGenerateFortune}
        disabled={!mbti || !mood}
      >
        운세 생성
      </button>

      {fortune && (
        <div className="mt-6">
          <FortuneCard {...fortune} />
        </div>
      )}
    </div>
  );
}
