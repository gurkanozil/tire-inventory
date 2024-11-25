import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inventory from './components/Inventory';
import Login from './components/Login';
import './App.css';
import { auth } from './firebaseConfig';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';

function App() {
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
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
