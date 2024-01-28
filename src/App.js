import { Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import HomePage from './pages/HomePage';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ProfilePage from './pages/ProfilePage';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, removeUser } from './store/user';
import { getCurrentUser } from './utils/userDetails';

function App() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();
  const auth = getAuth();
  onAuthStateChanged(auth, (data) => {
    console.log(data);
    if(data){
      getCurrentUser().then((user) => {
        dispatch(setUser(user));
      });
    }
    else{
      dispatch(removeUser());
    }
  });

  return <>
    {isAuth && (
      <div className='flex bg-black w-screen overflow-x-hidden min-h-screen'>
        <Sidebar />
        <div className='md:ml-[73px] xl:ml-[245px] w-full'>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/:username" element={<ProfilePage/>} />
          </Routes>
        </div>
      </div>
    )}
    {!isAuth && <Routes><Route path="/" element={<AuthPage/>} /></Routes>}
  </>
  
}

export default App;
