import React, {useState, useEffect} from 'react';
import {RecoilRoot} from 'recoil';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Chat from "./pages/Chat/Chat";
import Login from "./pages/Login/Login";
import RetrieveUserInfo from "./pages/Login/RetrieveUserInfo";
import Landing from './pages/LandingPage/Landing';
import { useNavigate } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  
  useEffect(()=>{
    setTimeout(()=>{setLoading(false)}, 2300);
    console.log(window.location.pathname)
  }, [])

  return (
    <RecoilRoot>
      <BrowserRouter>
        <div style={{display:"flex", flexDirection:"column", height:"100%", flex:1}}>
          {window.location.pathname==='/' && loading ?null:<Header />}
          <Routes>
            <Route path={"/"} element={loading?<Landing/>:<Home />} />
            <Route path={"/chat"} element={<Chat />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/landing"} element={<Landing />} />
            <Route path={"/saveuser"} element={<RetrieveUserInfo />} />
          </Routes>
        </div>
        {/* <Footer /> */}
      </BrowserRouter>
    </RecoilRoot>
  );
}


export default App;
