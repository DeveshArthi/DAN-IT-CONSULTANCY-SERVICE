
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  adminApi,
  initializeCsrf,
  setCsrfToken,
} from '../services/adminApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function restoreSession() {
      try {
        const result = await adminApi.me();

        if (active) {
          setAdmin(result.admin);
          setCsrfToken(result.csrfToken);
        }
      } catch {
        if (active) setAdmin(null);
      } finally {
        if (active) setLoading(false);
      }
    }

    restoreSession();

    return () => {
      active = false;
    };
  }, []);

  async function login(email, password) {
    await initializeCsrf();

    const result = await adminApi.login(email, password);

    setCsrfToken(result.csrfToken);
    setAdmin(result.admin);

    return result;
  }

  
async function logout() {
  await adminApi.logout();
  setAdmin(null);
  setCsrfToken('');
}


  return (
    <AuthContext.Provider
      value={{ admin, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAdminAuth must be used within AuthProvider'
    );
  }

  return context;
}
