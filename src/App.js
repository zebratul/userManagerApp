import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import UserManagement from './UserManagement';
import RegistrationForm from './RegistrationForm';
import Navbar from './Navbar';
import UserContext from './UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CustomStyles.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setToken(token);
    }

    setLoading(false);
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    window.location.href = "/";
  };

  return (
    <UserContext.Provider value={user}>
      <Router>
        <div>

          <Routes>
            <Route path="/" element={<Login setUserInfo={setUser}/>} />
            <Route path="/register" element={<RegistrationForm />} />
            {token ? (
              <Route path="/dashboard" element={<UserManagement handleLogout={handleLogout}/>} />
              ) : (
              <Route to="/" replace />
              )}
            <Route path="*" element={<h1>Page not found</h1>} />
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;