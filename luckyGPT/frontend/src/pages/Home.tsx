import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import FortuneCard from '../components/FortuneCard';
import { getKmaWeather } from '../utils/kmaWeather';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn, logout } from '../utils/auth';


const mbtiList = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP'
];

const moods = [
  { emoji: '😄', label: '기쁨' },
  { emoji: '😐', label: '평범함' },
  { emoji: '😞', label: '우울함' },
  { emoji: '😡', label: '분노' },
  { emoji: '😢', label: '슬픔' },
  { emoji: '😴', label: '피곤함' },
  { emoji: '😰', label: '불안함' },
  { emoji: '🤩', label: '설렘' },
  { emoji: '😎', label: '자신감' },
  { emoji: '😕', label: '혼란스러움' },
  { emoji: '🥱', label: '지루함' },
  { emoji: '😍', label: '사랑스러움' },
];

export default function Home() {
  const [mbti, setMbti] = useState('');
  const [mood, setMood] = useState('');
  const [fortune, setFortune] = useState<any | null>(null);
  const [weather, setWeather] = useState('날씨 불러오는 중...');
  const navigate = useNavigate();

  useEffect(() => {
    // 로그인하지 않았으면 /auth로 이동
    if (!isLoggedIn()) {
      navigate('/auth');
      return;
    }

    // 현재 위치 기반 날씨 정보 가져오기
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const w = await getKmaWeather(lat, lon);
        setWeather(w);
      },
      (err) => {
        console.warn("위치 권한 오류:", err);
        setWeather("날씨 정보 없음");
      }
    );
  }, []);

  const handleGenerateFortune = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.post('/generate', {
        mbti,
        mood,
        weather,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFortune(response.data);
    } catch (error) {
      console.error('운세 생성 실패:', error);
      alert('운세 생성 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">🎯 LuckyGPT - 오늘의 운세</h1>
        <Link to="/history" className="text-blue-500 underline text-sm">
          📚 히스토리 보기
        </Link>
      </div>

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
      <div className="flex flex-wrap gap-2 mb-4">
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
        onClick={logout}
        className="text-sm text-gray-500 hover:text-red-500 ml-auto"
        >
        🚪 로그아웃
      </button>
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
