import { useNavigate } from "react-router-dom";
import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";
import { googleCredential } from '../../state/state';
import { useRecoilState } from 'recoil';
import { userState } from '../../state/state';
import PATH from "../../constants/path"
import env from "../../api/env"
import instance from "../../api/instance"
import jwtDecode from "jwt-decode";

const GoogleLoginButton = () =>{
    const navi = useNavigate();
    const [userId, setUserId] = useRecoilState(userState);
    const clientId = env.REACT_APP_GOOGLE_CLIENT_ID;
    const [credential, setCredential] = useRecoilState(googleCredential);

    return (
        <>
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    onSuccess={async(res)=>{
                        setCredential(res.credential);
                        console.log(res.credential);
                        let decoded = jwtDecode(res.credential);
                        console.log(decoded)
                        navi(PATH.CHAT);
                        setUserId(decoded.name);
                        instance.post("/api/auth", {
                            user : decoded.name,
                            credentials : res.credential
                        })
                    }}
                    onFailure={(err)=>{
                        console.log(err);
                    }}
                />
            </GoogleOAuthProvider>
        </>
    );
}

export default GoogleLoginButton