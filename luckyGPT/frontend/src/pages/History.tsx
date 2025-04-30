import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { isLoggedIn } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

interface Fortune {
  id: number;
  mbti: string;
  mood: string;
  weather: string;
  summary: string;
  advice: string;
  caution: string;
  encouragement: string;
  created_at: string; // ✅ ISO 문자열로 응답됨 → string 타입 유지
}

export default function History() {
  const [history, setHistory] = useState<Fortune[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('/history', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHistory(response.data);
      } catch (err: any) {
        setError('운세 기록을 불러오지 못했습니다.');
        console.error('❌ /history 호출 실패:', err);
      }
    };

    if (!isLoggedIn()) {
      alert('로그인 후 이용해주세요.');
      navigate('/auth');
    } else {
      fetchHistory();
    }
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">📜 운세 히스토리</h1>

      {error && <p className="text-red-500">{error}</p>}

      {history.length === 0 && !error && <p>운세 기록이 없습니다.</p>}

      <div className="flex flex-col gap-4">
        {history.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 shadow-md bg-white">
            <p className="text-sm text-gray-400">
              {new Date(item.created_at).toLocaleString()}
            </p>
            <p><strong>MBTI:</strong> {item.mbti}</p>
            <p><strong>기분:</strong> {item.mood}</p>
            <p><strong>날씨:</strong> {item.weather}</p>
            <p><strong>요약:</strong> {item.summary}</p>
            <p><strong>추천:</strong> {item.advice}</p>
            <p><strong>주의:</strong> {item.caution}</p>
            <p className="text-indigo-600 italic">💬 응원 메시지: {item.encouragement}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
