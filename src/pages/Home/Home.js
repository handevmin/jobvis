import React from 'react';
import styles from './Home.module.css'; // Import the CSS file for styling
import ImageBlog from "../../assets/image/calender.jpg";
import PATH from "../../constants/path";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { userState } from '../../state/state';
import Button from '../../components/@common/Button/Button';
const Home = () => {
  const navi = useNavigate();
  const [userId, setUserId] = useRecoilState(userState);
  
  return (
    <main className={styles.blog_screen}>
      <div className={styles.posts}>
        <div className={styles.img_container}>
          <img className={styles.post_image} src={ImageBlog} alt="calendar"/>
        </div>
        <div className={styles.post_content}>
          <h2 className={styles.post_title}>일정관리, 손쉽게 Jobvis</h2>
          <h3 className={styles.post_description}>
            나만의 비서에게 일정을 말해주세요. <br /> Jobvis는 대화를 통해 일정을 관리해 줄 수 있습니다.
          </h3>
          <Button 
            className={styles.button}
            onClick={()=>{navi(userId !== ""?PATH.CHAT:PATH.LOGIN)}}>
              대화 시작하기
          </Button>
          {/* <p >
            with Google Calender
          </p> */}
        </div>
      </div>
    </main>
  );
}
export default Home;
