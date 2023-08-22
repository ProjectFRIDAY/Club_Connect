import styled from "styled-components";

export const DF = {
  ModalWrapper: styled.div`
    position: absolute;
    top: 30vh;
    right: 5px;
    width: 490px;
    height: 800px;
    background-color: white;
    z-index: 6;
    box-shadow: 0 0 0 5px #fada5e inset;
  `,
  ModalHeader: styled.div`
    height: 50px;
    background-color: #fada5e;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  ModalWriteFeed: styled.div`
    height: 180px;
    width: 100%;
    box-shadow: 0 0 0 5px #fada5e inset;
    background: #f5f5f5;
    position: absolute;
    bottom: 0px;
  `,
  ModalFeedReg: styled.form`
    width: 100%-54px;
    height: 148px;
    margin: 16px 27px 21px 27px;
  `,
  RegTop: styled.div`
    width: 100%;
    height: 36px;
    display: flex;
    margin-bottom: 12px;
  `,
  RegExplain: styled.span`
    line-height: 24px;
  `,
  RegBottom: styled.div`
    width: 100%;
    height: 112px;
  `,
  WriteInput: styled.textarea`
    width: 98%;
    height: 100px;
    font-family: "Inter";
    resize: none;
  `,
  FeedbackSend: styled.button`
    width: 80px;
    height: 24px;
    border-radius: 10px;
    position: relative;
    left: 120px;
  `,
  Feedback: styled.div`
    width: 450px;
    height: 520px;
    position: absolute;
    top: 75px;
    margin-left: 20px;
    overflow-y: scroll;
  `,
  EachFeedWrapper: styled.div`
    width: 100%;
    height: auto;
  `,
  ProfileSize: styled.img`
    width: 46px;
    height: 46px;
    object-fit: cover;
    border-radius: 50%;
  `,
  FeedWrapperHeader: styled.div`
    display: flex;
  `,
  HeaderButton: styled.button`
    width: 80px;
    height: 27px;
    box-shadow: none;
  `,
  ThumbCount: styled.p`
    display: inline;
    color: black;
    line-height: 27px;
    text-align: center;
    position: relative;
    top: -5px;
  `,
  ProfileName: styled.div`
    line-height: 46px;
    font-size: 100%; //20px;; // 글자 크기가 너무 커서 조절했습니다
  `,
  ButtonWrapper: styled.div`
    position: relative;
    left: 50px;
    top:15px;
  `,
  FeedWrapperButton: styled.button`
    margin-top: 12px;
    border: none;
    height: 26px;
    width: 80px;
    background-color: #fada5e;
    position: relative;
    right: 180px;
    box-shadow: none;
  `,
  WrapperSearch: styled.a`
    text-decoration-line: none;
    height: 26px;
    width: 60px;
    color: black;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    text-align: center;
  `,
  DetailPageButton: styled.a`
    text-decoration-line: none;
    height: 40px;
    width: 80px;
    color: black;
    font-size: 18px;
  `,
  DetailPageButtonWrapper: styled.button`
    border: none;
    height: 30px;
    width: 120px;
    background-color: #fada5e;
    box-shadow: none;
  `,
  AgainWrapper: styled.div`
    width: 100%;
    height: auto;
  `,
  AgainTable: styled.table`
    width: 100%;
    position: relative;
    right: 10px;
  `,
  CommentDiv: styled.div`
    position: relative;
    top: 50px;
  `,
  ModifyFin:styled.button`
    width:150px;
    height:37.5px;
    box-shadow:none;
  `,
  ModifyText:styled.textarea`
    border-radius: 10px;
    width: 90%;
    min-height: 90px;
    font-family: 'Inter';
    font-size: 15px;
    line-height: 25px;
    resize: none;
    border:1px solid black;
    ::placeholder {
      color:black
    }
  `
};
