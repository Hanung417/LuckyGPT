import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      const endpoint = isLogin ? '/login' : '/signup';
      const res = await axios.post(endpoint, { email, password });
      localStorage.setItem('access_token', res.data.access_token);
      alert(`${isLogin ? '로그인' : '회원가입'} 성공!`);
      navigate('/');
    } catch (err: any) {
      alert('실패: ' + (err.response?.data?.detail || '에러 발생'));
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">{isLogin ? '로그인' : '회원가입'}</h2>

      <input
        type="email"
        placeholder="이메일"
        className="w-full border rounded p-2 mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="비밀번호"
        className="w-full border rounded p-2 mb-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="w-full bg-purple-600 text-white py-2 rounded mb-2"
        onClick={handleAuth}
      >
        {isLogin ? '로그인' : '회원가입'}
      </button>

      <p className="text-center text-sm text-gray-600">
        {isLogin ? '계정이 없으신가요?' : '이미 계정이 있나요?'}{' '}
        <button className="text-blue-500 underline" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? '회원가입' : '로그인'}
        </button>
      </p>
    </div>
  );
}
