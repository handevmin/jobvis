import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import PATH from "../../constants/path";
import MemberIcon from "../../assets/icon/member-icon.svg";
import styles from "./Header.module.css";
// import useTokenContext from "../../hooks/useTokenContext";
import instance from "../../api/instance.js";
import { userState } from '../../state/state';
import { useRecoilState } from 'recoil';
import Logo from "../../assets/image/jobvis_logo.png";

const Header = () => {
  const navi = useNavigate();
  const [userId, setUserId] = useRecoilState(userState);
  const {token, setToken} = useState(true);
  // const {token, resetToken } = useTokenContext();
  const [isShowMemberMenu, setIsShowMemberMenu] = useState(false);
  
  const onChange = ({ target }) => {
    setIsShowMemberMenu(target.checked);
  };

  const routeTo = ({ pathname }) => {
    // history는 이제 안쓰임 !!
    // history.push({pathname,});
    navi({pathname,});
    setIsShowMemberMenu(false);
  };

  const onLogout = () => {
    setIsShowMemberMenu(false);
    setUserId("");
    // resetToken();
    navi(PATH.HOME)
  };

  return (
    <div className={styles.box}>
      <header className={styles.header}>
        <div className={styles.content}>
          <h1>
            <Link className={styles.title} to={PATH.HOME}>
              <img
                className={styles.logo}
                src={Logo}
                alt="JOBVIS 로고"
              />
              JOBVIS
            </Link>
          </h1>
          <div className={styles["link-container"]}>
            {userId!=="" ? (
              <div className={styles["member-menu-container"]}>
                <label
                  aria-label="회원관리 툴팁"
                >
                  {/* <img src={MemberIcon} alt="회원" /> */}
                  <p className={styles.title}> Menu </p>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={isShowMemberMenu}
                    onChange={onChange}
                  />
                </label>

                {isShowMemberMenu && (
                  <>
                    <ul className={styles["member-menu-list"]}>
                      {/* <li className={styles["member-menu-listitem"]}>
                        <button type="button" onClick={() => routeTo({ pathname: PATH.MY_PAGE })}>
                          마이페이지
                        </button>
                      </li>
                      <li className={styles["member-menu-listitem"]}>
                        <button
                          type="button"
                          onClick={() => routeTo({ pathname: PATH.MY_APPLICATION })}
                        >
                          내 지원 현황
                        </button>
                      </li> */}
                      <li className={styles["member-menu-listitem"]} onClick={onLogout}>
                        로그아웃
                      </li>
                    </ul>
                    <div className={styles.dimmed} onMouseDown={() => setIsShowMemberMenu(false)} />
                  </>
                )}
              </div>
            ) : (
              <>
                <Link to={PATH.CHAT}>시작하기</Link>
                {/* <div className={styles.bar} />
                <Link to={PATH.SIGN_UP}>회원가입</Link> */}
              </>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
