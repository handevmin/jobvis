import React, { useEffect } from "react";
import { userState } from '../../state/state';
import { useRecoilState } from 'recoil';

const Login = () => {
  const [userId, setUserId] = useRecoilState(userState);
    
    return (
      <div>
        Sign Up
      </div>
    );
  };
  
  export default Login;