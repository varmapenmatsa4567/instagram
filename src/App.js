import { Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import HomePage from './pages/HomePage';
import { useState } from 'react';
import Sidebar from './components/Sidebar';

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

  return <>
    {user && (
      <div className='flex bg-black w-screen min-h-screen'>
        <Sidebar />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    )}
    {!user && <Routes><Route path="/" element={<AuthPage/>} /></Routes>}
  </>
  
}

export default App;
