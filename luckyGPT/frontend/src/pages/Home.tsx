import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import FortuneCard from '../components/FortuneCard';
import { getKmaWeather } from '../utils/kmaWeather';

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
  const [weather, setWeather] = useState('날씨 불러오는 중...');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        console.log('📍 위치 확인:', lat, lon); // 🔍 확인용
  
        const w = await getKmaWeather(lat, lon);
        console.log('🌤 날씨 정보:', w); // 🔍 확인용
  
        setWeather(w);
      },
      (err) => {
        console.warn("🚫 위치 권한 오류:", err);
        setWeather("날씨 정보 없음");
      }
    );
  }, []);

  const handleGenerateFortune = async () => {
    try {
      const response = await axios.post('/generate', {
        mbti,
        mood,
        weather, // 실제 날씨 반영
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
      <p className="mb-4 text-sm text-gray-600">📍 현재 날씨: {weather}</p>

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
