import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import PATH from "../../constants/path";
import { userState } from '../../state/state';
import { useRecoilState } from 'recoil';
import { googleCredential } from '../../state/state';
import instance from "../../api/instance"
const Login = () => {
    const [userId, setUserId] = useRecoilState(userState);
    const [credential, setCredential] = useRecoilState(googleCredential);
    const navi = useNavigate();
    const setUserSession = (Id) =>{
      
      setUserId(Id);
      navi(PATH.CHAT);
    }
    useEffect(() => {
        // Parse the query string
        const queryParams = new URLSearchParams(window.location.search);
        
        // Check if the "username" and "token "parameter exists
        if (queryParams.has('username')||queryParams.has('token')||queryParams.has('refreshToken')) {
            const userToken = queryParams.get('token');
            const userRefreshToken = queryParams.get('refreshToken');
            const usernameValue = queryParams.get('username');
            instance.post("/api/calendar/auth",{
              user:usernameValue, 
              token:userToken, 
              refresh_token:userRefreshToken
            })
            setCredential({token : userToken, refreshToken:userRefreshToken});
            setUserSession(usernameValue)
            // Handle the username value
        }
      }, []);
    return (
      <div > 
        redirecting...
      </div>
      
    );
  };
  
  export default Login;