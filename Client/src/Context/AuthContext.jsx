import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser(payload);
      } catch (err) {
        console.error('Invalid token');
        setUser(null);
      }
    }
  }, []);

 const login = (token) => {
  if (!token) {
    console.error("No token provided to login()");
    return;
  }

  localStorage.setItem("token", token);

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    setUser(payload); 
  } catch (err) {
    console.error("Invalid token format", err);
  }
};

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
