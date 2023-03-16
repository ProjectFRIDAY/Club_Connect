import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Style } from "../../layout/ReferenceListStyle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RefModal from "../modal/RefModal";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

import StarIcon from "@mui/icons-material/Star";
const useStyles = makeStyles({
  home: {
    fontSize: "35px",
  },
  home2: {
    fontSize: "35px",
    color: "red",
  },
  arrow: {
    fontSize: "25px",
    color: "#FADA5E",
    float: "left",
    cursor: "pointer",
    display: "block",
    marginLeft: "20px",
    fontWeight: "700",
  },
  star: {
    color: "#FADA5E",
  },
});

function ManageList(props) {
  // 받아온 data 가공 필요
  const classes = useStyles();
  const navigate = useNavigate();
  let data = props.data;
  console.log(data);

  const [modalVisibleId, setModalVisibleId] = useState("");
  const onModalHandler = (id) => {
    setModalVisibleId(id);
  };
  const [modalVisibleId2, setModalVisibleId2] = useState(false);
  const onModalHandler2 = (id) => {
    setModalVisibleId2(id);
  };

  function modalLocation(i) {
    if (window.innerWidth <= 767) {
      if (i % 2 === 0) {
        return 2;
      }
    } else if (window.innerWidth <= 1023) {
      if (i % 3 === 0) {
        return 3;
      }
    } else {
      if (i % 4 === 0) {
        return 4;
      }
    }
  }
  let Lo = window.location.href;

  return (
    <Style.ContestList>
      {data.map((mywork, index) => (
        <Style.ContestItem key={mywork.postId}>
          {/*<Link to={navigate(`/ref/${mywork.categoryName}/${mywork.postId}`)}>*/}
          <Style.ContestImgCrop onClick={() => onModalHandler2(mywork.postId)}>
            {/*표지사진*/}
            <Style.ContestImg
              onClick={() =>
                navigate(`/ref/${mywork.categoryName}/${mywork.postId}`)
              }
              src={mywork.storeFileUrls[0]} // 나중에 바꿔야됨. 아직 프사 기능 추가 안됨
              alt={mywork.postId}
            />
          </Style.ContestImgCrop>
          {/*</Link>*/}

          {modalVisibleId2 && (
            <RefModal
              id2={mywork.postId}
              modalVisibleId2={modalVisibleId2}
              setModalVisibleId2={setModalVisibleId2}
              idea={mywork.postId}
            />
          )}

          <Style.ProfileInfo>
            {/*유저 프로필 사진*/}
            <Style.ProfileSize
              src={require("../../images/test1.jpg")}
              alt={mywork.nickname}
              onMouseEnter={() => {
                onModalHandler(mywork.postId);
                modalLocation(index + 1);
              }}
              onClick={() => {
                onModalHandler(mywork.postId);
                modalLocation(index + 1);
              }}
            />
            {/*
            <RefModalFollow
              id={mywork.postId}
              modalVisibleId={modalVisibleId}
              setModalVisibleId={setModalVisibleId}
              location={modalLocation(index + 1)}
              idea={mywork}
            />*/}

            <Style.ProfileFont>{mywork.nickname}</Style.ProfileFont>
            <Style.ProfileInfoDetail>
              {/* 유저 hits, thumbs, scrap */}
              &nbsp;
              <RemoveRedEyeOutlinedIcon className={classes.home} />
              &nbsp;{mywork.views}&nbsp; &nbsp;
              <FavoriteOutlinedIcon className={classes.home2} />
              &nbsp;{mywork.likeCount}&nbsp; &nbsp;
              <StarIcon className={classes.star} />
              &nbsp;{mywork.scrapCount}
            </Style.ProfileInfoDetail>
          </Style.ProfileInfo>
        </Style.ContestItem>
      ))}
    </Style.ContestList>
  );
}

export default ManageList;
