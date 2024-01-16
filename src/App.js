import { Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import HomePage from './pages/HomePage';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    console.log(user);
    if(user){
      setUser(user);
    }
    else{
      setUser(null);
    }
  });

  return <Routes>
    {user && <Route path="/" element={<HomePage/>} />}
    {!user && <Route path="/" element={<AuthPage/>} />}
  </Routes>
  
}

export default App;
