import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { Cookies } from "react-cookie";
import axios from "axios";
import SocialLoginContainer from "./SocialLoginContainer";
import { getCookie, loadCookie } from "../cookies";
const Style = {
  StyledButton: styled.button`
    width: 10rem;
    height: 3rem;
    background-color: white;
    color: #464646;
    font-size: 15px;
    border: solid 2px white;
    cursor: pointer;
    letter-spacing: 0.1em;
    font-weight: 550;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 50px;
    margin-left: 10px;
  `,
};

function LoginCheck(props) {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);

  const cookies = new Cookies();
  //const [cookies, setCookies, removeCookie] = useCookies(["JSESSIONID"]);
  const authCheck = () => {
    // 페이지에 들어올 때 쿠키로 사용자 체크
    // httpOnly가 true로 설정되어있어서 접근하지 못했음
    const cookie = cookies.get("JSESSIONID");
    if (cookie !== undefined) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  useEffect(() => {
    authCheck();
  }, []);

  const logoutOnClick = () => {
    axios
      .post("http://localhost:8080/user/logout")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    cookies.remove("JSESSIONID", { path: "/" });
    setIsLogin(false);
    navigate("/");
  };
  const loginOnClick = () => {
    navigate("/sociallogin");
  };
  return (
    <div>
      {isLogin ? (
        <Style.StyledButton onClick={logoutOnClick}>
          로그아웃
        </Style.StyledButton>
      ) : (
        <Style.StyledButton onClick={loginOnClick}>로그인</Style.StyledButton>
      )}
    </div>
  );
}

export default LoginCheck;
