import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inventory from './components/Inventory';
import Login from './components/Login';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { auth } from './firebaseConfig';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div>
            <h1>Welcome to the Tire Inventory</h1>
            {user ? (
              <div>
                <Inventory />
                <button onClick={handleLogout}>Log Out</button>
              </div>
            ) : (
              <div>
                <h2>Please log in to manage the inventory.</h2>
                <Login />
              </div>
            )}
          </div>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/count" element={
          <>
            <div>
              <a href="https://vite.dev" target="_blank">
                <img src={viteLogo} className="logo" alt="Vite logo" />
              </a>
              <a href="https://react.dev" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo" />
              </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
              <button onClick={() => setCount((count) => count + 1)}>
                count is {count}
              </button>
              <p>
                Edit <code>src/App.tsx</code> and save to test HMR
              </p>
            </div>
            <p className="read-the-docs">
              Click on the Vite and React logos to learn more
            </p>
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
