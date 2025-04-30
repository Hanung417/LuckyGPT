export function isLoggedIn(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token;
  }

export function logout() {
    localStorage.removeItem('access_token');
    window.location.href = '/auth';  // 또는 navigate 사용 가능
  }