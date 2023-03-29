import React from 'react'
import styles from './Footer.module.css'
import styled from 'styled-components'
import img from '../../images/LOGO_SYMBOLMARK.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Style = {
  FooterEmail:styled.p`
    font-weight: 500;
    font-size: 20px;
    line-height: 29px;
  `,
  FooterLogo:styled.img`
    width:150px;
    height:35px;
    margin: auto;
    display: block;
    position: relative;
    top:10px;
  `,
  FooterLink:styled.div`
    font-weight: 500;
    font-size: 20px;
    line-height: 29px;
    display: inline-block;
    text-align:center;
    margin: auto;
  `,
  onCursor:styled.span`
    margin-left: 44px;
    cursor: pointer;
  `
}
function Footer() {
  const navigate = useNavigate()
  const logoutOnClick = () => {
    axios
      .post("/BE/user/logout", {}, { withCredentials: true })
      .then((res) => {
        console.log(res);
        alert("로그아웃 되었습니다.");
        window.location.replace("/"); // 새로고침
        navigate("/");
        // 여기서 JSESSIONID가 삭제되어야 되는데 안되고 있다.
        // 원래 삭제는 안되고, 대신 JSESSIONID는 무효화된다
      })
      .catch((err) => {
        console.log(err);
      });
    //cookies.remove("JSESSIONID", { path: "/" });
    //localStorage.removeItem("id");
    sessionStorage.removeItem("nickname");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("new");
    navigate("/");
  };
  return (
    <footer className={styles.footer} style={window.location.href.includes("mypage") || 
    window.location.href.includes("manage/feedback") ||
    window.location.href.includes("manage/share")?
    {position:"relative"}:{position:"absolute",bottom:"-240px"}}>
      <div className={styles.contents}>
        <Style.FooterLogo src={img} alt="" /><br />
        
        <Style.FooterLink>
          <Style.FooterEmail>이메일 : referencemoa@gmail.com</Style.FooterEmail>
          <Style.onCursor style={{marginLeft:"0px"}}>이용약관</Style.onCursor>
          <Style.onCursor>개인정보 처리방침</Style.onCursor>
          <Style.onCursor>문의하기</Style.onCursor>
          <Style.onCursor onClick={logoutOnClick}>로그아웃</Style.onCursor>
        </Style.FooterLink>
      </div>
    </footer>
  )
}

export default Footer
