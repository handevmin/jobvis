import React from 'react';
import styles from './Home.module.css';
import ImageBlog from "../../assets/image/calender.jpg";
import PATH from "../../constants/path";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { userState } from '../../state/state';
import Button from '../../components/@common/Button/Button';

const Home = () => {
  const navi = useNavigate();
  const [userId, setUserId] = useRecoilState(userState);

  return (
    <main className={styles.blog_screen}>
      <section className={styles.hero_section}>
        <img src={ImageBlog} alt="Calendar" className={styles.hero_image} />
        <div className={styles.hero_content}>
          <h1 className={styles.title}>일정관리, 손쉽게 Jobvis</h1>
          <p className={styles.description}>
          나만의 비서에게 일정을 말해주세요. <br /> Jobvis는 대화를 통해 일정을 관리해 줄 수 있습니다.
          </p>
          <Button 
            className={styles.cta_button}
          //onClick={() => { navi(userId !== "" ? PATH.CHAT : PATH.LOGIN) }}>
          onClick={() => { navi(PATH.CHAT) }}>
              대화 시작
          </Button>
        </div>
      </section>
    </main>
  );
}

export default Home;
