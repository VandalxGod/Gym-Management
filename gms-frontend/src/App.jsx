import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
//Router
import { Routes, Route, useNavigate } from 'react-router-dom';

//folders
import Home from './Pages/Home/home'
import Dashboard from './Pages/DashBoard/Dashboard';
import Sidebar from './components/sidebar/Sidebar';
import Member from './Pages/member/Member';
import GeneralUser from './Pages/GeneralUser/Generaluser';
import Memberdetail from './Pages/MemberDetail/Memberdetail';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [count, setCount] = useState(0)
    
  const navigate = useNavigate();
  const[isLogin, setIsLogin] = useState(false);

  useEffect(()=>{
    const isLogedIn = localStorage.getItem("isLogin");
    if (isLogedIn === "true"){
      setIsLogin(true);
      navigate('/dashboard')
    }else{
      setIsLogin(false);
      navigate('/');
    }
  },[localStorage.getItem("isLogin")])

  return (  
    <>
    <div className='flex'>
      {isLogin && <Sidebar />}
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path = '/Member' element={<Member />}/>
        <Route path= '/specific/:page' element={<GeneralUser />} />
        <Route path= '/member/:id' element={<Memberdetail />} />


      </Routes>
    </div>
    </>
  )
}

export default App
