import React, { useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import styles from './Login.module.css';
import Button from '../../components/@common/Button/Button';
import PATH from "../../constants/path";
import { userState } from '../../state/state';
import { useRecoilState } from 'recoil';
import env from '../../api/env';
import { useGoogleLogin } from '@react-oauth/google';
import instance from "../../api/instance";
import CustomGoogleLoginButton from "../../components/GoogleLoginButton/CustomGoogleLoginButton"
import GoogleLoginButton from "../../components/GoogleLoginButton/GoogleLoginButton"
const Login = () => {
    const [userId, setUserId] = useRecoilState(userState);
    const navi = useNavigate();
    const setUserSession = (Id) =>{
      setUserId(Id);
      navi(PATH.CHAT);
    }

    // const handleGoogleLogin = useGoogleLogin({
    //   onSucess: response => {
    //     console.log(response);
    //     try{
    //       const data = instance.get("https://www.googleapis.com/oauth2/v3/userinfo", {
    //         headers: {
    //           "Authorization" : `Bearer ${response.access_token}`
    //         }
    //       })
    //       console.log(data);
    //     } catch (err){
    //       console.log(err);
    //     }
    //   },
    // });

    return (
      <div className={styles.content}> 
        <div className={styles.innerContent}>
          {/* <Button className={styles.login_btn} onClick={handleGoogleLogin}>GOOGLE LOGIN</Button> */}
          <div className={styles.description}>
            대화형 스케줄 관리 서비스, Jobvis를 사용하시려면,
            구글 캘린더와 연결이 필요해요.
          </div>
          <CustomGoogleLoginButton/>
        </div>
        
      </div>
      
    );
  };
  
  export default Login;