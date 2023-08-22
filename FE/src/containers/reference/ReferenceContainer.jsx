import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FirstModal from "../modal/FirstModal";
import RefSearch from "./RefSearch";
const Style = {
  UnderHeader: styled.div`
    box-sizing: border-box;
    position: absolute;
    background: #ffffff;
    border: 1px solid #b0b0b0;
    border-radius: 20px;
    width: 803px;
    height: 59px;
    top: 90px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    justify-content: space-around;
    @media ${(props) => props.theme.desktop} {
      width: 650px;
    }
    @media ${(props) => props.theme.mobile} {
      width: 450px;
      padding-left: 15px;
      padding-right: 15px;
    }
  `,
  Sort: styled.div`
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    text-align: center;
    color: #464646;
    cursor: pointer;
    @media ${(props) => props.theme.mobile} {
      font-size: 15px;
      font-weight: 900;
    }
  `,
  PageStyle: styled.div`
    color: #fada5e;
  `,
};
function ReferenceContainer() {
  const Navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    console.log(typeof sessionStorage.getItem("new"));
    if (sessionStorage.getItem("new") === "true") {
      // type이 string
      setModalOpen(true);
      //console.log("First Modal");
    } else {
    }
  }, []);

  const ideaOnClick = () => {
    Navigate("/");
  };

  const marketingOnClick = () => {
    Navigate("/ref/marketing");
  };

  const videoOnClick = () => {
    Navigate("/ref/video");
  };

  const designOnClick = () => {
    Navigate("/ref/design");
  };

  const etcOnClick = () => {
    Navigate("/ref/etc");
  };

  return (
    <>
      <>
        {modalOpen && (
          <FirstModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
        )}
      </>
      <Style.UnderHeader>
        <Style.Sort onClick={ideaOnClick}>
          {window.location.pathname === "/" ? (
            <Style.PageStyle>기획/아이디어</Style.PageStyle>
          ) : (
            "기획/아이디어"
          )}
        </Style.Sort>
        <Style.Sort onClick={marketingOnClick}>
          {window.location.pathname === "/ref/marketing" ? (
            <Style.PageStyle>광고/마케팅</Style.PageStyle>
          ) : (
            "광고/마케팅"
          )}
        </Style.Sort>
        <Style.Sort onClick={videoOnClick}>
          {window.location.pathname === "/ref/video" ? (
            <Style.PageStyle>영상</Style.PageStyle>
          ) : (
            "영상"
          )}
        </Style.Sort>
        <Style.Sort onClick={designOnClick}>
          {window.location.pathname === "/ref/design" ? (
            <Style.PageStyle>디자인</Style.PageStyle>
          ) : (
            "디자인"
          )}
        </Style.Sort>
        <Style.Sort onClick={etcOnClick}>
          {window.location.pathname === "/ref/etc" ? (
            <Style.PageStyle>기타아이디어</Style.PageStyle>
          ) : (
            "기타아이디어"
          )}
        </Style.Sort>
      </Style.UnderHeader>
      <RefSearch />
    </>
  );
}

export default ReferenceContainer;
