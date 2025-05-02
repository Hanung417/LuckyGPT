import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import FortuneCard from '../components/FortuneCard';
import { getKmaWeather } from '../utils/kmaWeather';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn, logout } from '../utils/auth';
import { Button } from '../components/Button';
import { motion, AnimatePresence } from 'framer-motion';


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
  const [fortune, setFortune] = useState(null);  // 운세 결과 상태
  const [weather, setWeather] = useState('날씨 불러오는 중...');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/auth');
      return;
    }

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
  }, [navigate]);

  const handleGetFortune = async () => {
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

      setFortune(response.data); // 운세 결과를 상태에 저장
    } catch (error) {
      console.error('운세 생성 실패:', error);
      alert('운세 생성 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-purple-800 text-white flex flex-col items-center justify-center relative px-4 py-10 overflow-hidden">
      <div className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-10 z-0" style={{ backgroundImage: 'url(/assets/astrology-circle.png)' }} />

      <div className="z-10 text-center">
        <h1 className="text-4xl font-bold mb-2">🔮 LuckyGPT</h1>
        <p className="text-purple-200 text-sm mb-4">📍 현재 날씨: {weather}</p>
        <Link to="/history" className="text-blue-300 underline text-sm">📚 히스토리 보기</Link>
      </div>

      <div className="z-10 mt-8 w-full max-w-md space-y-6">
        <div>
          <h2 className="mb-2">MBTI를 선택하세요</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {mbtiList.map((type) => (
              <Button
                key={type}
                onClick={() => setMbti(type)}
                variant={mbti === type ? 'secondary' : 'outline'}
                className="w-16"
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-2">오늘 기분은 어떤가요?</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {moods.map(({ emoji, label }) => (
              <Button
                key={label}
                onClick={() => setMood(label)}
                variant={mood === label ? 'secondary' : 'outline'}
                className="w-24"
              >
                {emoji} {label}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={logout}
            className="text-sm text-gray-300 hover:text-red-500"
          >
            🚪 로그아웃
          </button>
        </div>

        <Button
          onClick={handleGetFortune}
          className="w-full py-3 text-lg bg-purple-600 hover:bg-purple-700"
          disabled={!mbti || !mood}
        >
          운세 생성
        </Button>

        <AnimatePresence>
          {fortune && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.4 }}
              className="mt-8"
            >
              {/* 운세 카드 출력 */}
              <FortuneCard
                summary={fortune.summary}
                advice={fortune.advice}
                caution={fortune.caution}
                encouragement={fortune.encouragement}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
