import React from 'react';
import styles from './Landing.module.css'; // Import the CSS file for styling
import ImageBlog from "../../assets/image/wave.jpg";
import PATH from "../../constants/path";
import { Link, useNavigate } from "react-router-dom";

const Landing = () => {
  const navi = useNavigate();

  return (
    <main className={styles.blog_screen}>
      <div className={styles.container}>
        <h1 className={styles.title}>JOBVIS</h1>
        <span className={styles.loader}>
        </span>
      </div>
    </main>
  );
}
export default Landing;
