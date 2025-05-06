// src/utils/auth.ts

const TOKEN_KEY = 'authToken';

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem(TOKEN_KEY);
  return !!token;  
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const login = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export const handleLogin = async (username: string, password: string): Promise<boolean> => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const { token } = data;

      login(token);
      return true;
    } else {
      console.error('Login failed:', response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1])); 
    const exp = payload.exp * 1000;  
    return Date.now() > exp; 
  } catch (error) {
    console.error('Error decoding token', error);
    return true; 
  }
};

export const refreshToken = async (): Promise<string | null> => {
  const token = getToken();
  if (!token || isTokenExpired(token)) {
    try {
      const newToken = await fakeApiRefreshToken(token);
      login(newToken);  
      return newToken;
    } catch (error) {
      console.error('Token refresh failed', error);
      logout();  
      return null;
    }
  }
  return token; 
};

