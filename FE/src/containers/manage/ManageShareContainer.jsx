import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import "./ManageShareContainer.scss";

const Style = {
  Container: styled.div`
    box-sizing: border-box;
    background: #ffffff;
    border: 1px solid #d0d0d0;
    border-radius: 30px;
    display: flex;
    align-items: center;
    margin: 0 auto;
    min-width: 480px;
    max-width: 1440px;
    width: 85%;
    //padding: 0 20%;
  `,
  Button: styled.button`
    width: 60%;
    max-width: 1200px;
    height: 60px;
    background: ${(props) => (props.state ? "#FADA5E" : "#C8D1E0")};
    color: ${(props) => (props.state ? "#010101" : "white")};

    border-radius: 30px;
    border: #fff48c;
    font-family: "NotoSansKR-700";
    font-size: 1rem;
    text-align: center;
    cursor: ${(props) => (props.state ? "pointer" : "default")};
    box-shadow: none;

    margin: 0 auto;
  `,
};

/* byte 수 세는 알고리즘 */
function getByteLength(s, b, i, c) {
  for (b = i = 0; (c = s.charCodeAt(i++)); b += c >> 11 ? 3 : c >> 7 ? 2 : 1);
  return b;
}

function ManageShareContainer({ match }) {
  const id = useParams(); // postId 가져옴
  const [name, setName] = useState("");
  const [comp, setComp] = useState("");
  const [compRes, setCompRes] = useState("수상작");
  const [thumbnail, setThumbnail] = useState(null);
  const [category, setCategory] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [uploads, setUploads] = useState([]);

  const [buttonColor, setButtonColor] = useState(false);

  const navigate = useNavigate();

  /* 작품명 */
  const onChangeName = (e) => {
    setName(e.target.value);
  };

  /* 참가 공모전 */
  const onChangeComp = (e) => {
    setComp(e.target.value);
  };

  /* 수상결과 */
  const onChangeRes = (e) => {
    setCompRes(e.target.value);
  };

  /* 카테고리 */
  const onChangeCategory = (e) => {
    setCategory(e.target.value);
    if (e.target.value === "video") {
      setUploads([]); // 초기화
    }
  };

  const onChangeYoutubeLink = (e) => {
    setYoutubeLink(e.target.value);
  };

  /* 표지사진 */
  const fileThumbnail = useRef(null);
  const onClickUpload_ = (e) => {
    fileThumbnail.current.click(); // input과 div 연결
  };

  const handleFileChange_ = (e) => {
    console.log(e.target.files);
    if (getByteLength(e.target.files[0].name) > 150) {
      alert("파일의 제목은 150자 미만입니다.");
    } else {
      setThumbnail(e.target.files[0]);
      console.log(e.target.files[0]);
    }
  };

  const onClickDelete_ = () => {
    //alert("삭제");
    setThumbnail(null);
  };

  /* 첨부파일 */
  const fileInput = useRef(null);
  const onClickUpload = (e) => {
    fileInput.current.click(); // input과 div 연결
  };

  const [fileSize, setFileSize] = useState(0);
  const handleFileChange = (e) => {
    const UploadList = [...uploads]; // 현재 uploads 복사
    console.log(UploadList);

    let isPdfOrMp4, isAnyBig, isDuplicate, isSizeError;
    let allisPdfOrMp4 = false,
      allisAnyBig = false,
      allisDuplicate = false,
      allisSizeError = false;
    for (let i = 0; i < e.target.files.length; i++) {
      console.log(i + 1 + ". " + e.target.files[i].name);

      // 1. 파일 확장자 검사
      isPdfOrMp4 = false;
      const exten = e.target.files[i].name.split(".");

      // 이미 file이 있는데 pdf 또는 mp4를 불러온다면
      if (
        (exten[1] === "pdf" || exten[1] === "mp4") &&
        (uploads.length > 0 || e.target.files.length > 1)
      ) {
        isPdfOrMp4 = true;
        allisPdfOrMp4 = true;
      }
      // 이미 pdf가 있는데 또 pdf나 mp4를 불러온다면
      for (let i = 0; i < uploads.length; i++) {
        let exten = uploads[i].name.split(".");
        if (exten[1] === "pdf" || exten[1] === "mp4") {
          isPdfOrMp4 = true;
          allisPdfOrMp4 = true;
        }
      }

      if (!isPdfOrMp4) {
        // 2. 파일 이름 길이 검사
        isAnyBig = false;
        if (getByteLength(e.target.files[i].name) > 150) {
          console.log(getByteLength(e.target.files[i].name));
          isAnyBig = true;
          allisAnyBig = true;
        }
        if (!isAnyBig) {
          // 3. 파일 중복 검사
          isDuplicate = false;
          for (let j = 0; j < UploadList.length; j++) {
            if (UploadList[j].name === e.target.files[i].name) {
              // 파일 중복이므로 담지 않는다
              isDuplicate = true;
              allisDuplicate = true;
              break;
            }
          }

          // 4. 파일 용량 검사
          isSizeError = false;
          if (fileSize + e.target.files[i].size > 1048576 * 50) {
            isSizeError = true;
            allisSizeError = true;
          } else {
            setFileSize(fileSize + e.target.files[i].size);
          }
          if (!isPdfOrMp4 && !isDuplicate && !isPdfOrMp4 && !isSizeError) {
            // 중복에 걸리지 않고 확장자도 잘 지켜졌다면
            UploadList.push(e.target.files[i]);
          }
        }
      }
    }
    if (allisPdfOrMp4) {
      alert("pdf 또는 mp4는 단독으로 1개만 올릴 수 있습니다.");
    } else if (allisAnyBig) {
      alert("파일 이름은 최대 75자입니다.");
    } else if (allisDuplicate) {
      alert("중복된 파일이 있습니다.");
    } else if (allisSizeError) {
      alert("최대 50MB까지 첨부할 수 있습니다.");
    }
    setUploads(UploadList); // 덮어 씌우기
  };

  const onClickDelete = (name) => {
    //alert("삭제");
    setUploads(uploads.filter((upload) => upload.name !== name));
  };

  /* 검사 */
  useEffect(() => {
    // 하나라도 비어있으면 버튼이 클릭되지 않게
    if (category === "video") {
      // 영상을 클릭했다면 유튜브 링크도 첨부해야함
      if (
        name.length > 0 &&
        comp.length > 0 &&
        compRes.length > 0 &&
        category.length > 0 &&
        thumbnail !== null &&
        youtubeLink.length > 0
      ) {
        setButtonColor(true);
      } else {
        setButtonColor(false);
      }
    } else if (category !== "video") {
      if (
        name.length > 0 &&
        comp.length > 0 &&
        compRes.length > 0 &&
        category.length > 0 &&
        thumbnail !== null &&
        uploads.length > 0
      ) {
        setButtonColor(true);
      } else {
        setButtonColor(false);
      }
    }
  }, [name, comp, compRes, category, uploads, thumbnail, youtubeLink]);

  /* 등록하기 */
  const onClickRegister = () => {
    const formdata = new FormData();

    // json 파일은 따로 Blob에 담음
    const UploadPostForm = {
      title: name,
      contestName: comp,
      category: category,
      contestAwardType: compRes,
      youtubeLink: youtubeLink,
    };
    console.log(UploadPostForm);
    console.log(thumbnail);
    console.log(uploads);

    const uploadPostForm = new Blob([JSON.stringify(UploadPostForm)], {
      type: "application/json",
    });

    // json data는 data에 넣는다
    formdata.append("data", uploadPostForm);

    // 표지 사진도 파일이다
    formdata.append("thumbnail", thumbnail);

    // file은 따로 넣고
    Object.values(uploads).forEach((file) => formdata.append("file", file));

    axios.defaults.withCredentials = true;

    console.log(formdata);
    axios
      .post("/BE/reference", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          alert("정상 등록되었습니다.");
          navigate("/manage/list");
        }
      })
      .catch((err) => {
        alert("통신 오류");
        console.log(err);
      });
  };

  return (
    <div
      style={{
        width: "100%",
        marginTop: "50px",//"100px",
        fontFamily: "NotoSansKR-400",
      }}
    >
      <div className="ManageShareContainer">
        <table className="table">
          <tbody>
            {/* 작품명 */}
            <tr>
              <th className="th">
                <label>작품명</label>
              </th>
              <td className="td">
                <input
                  required
                  type="email"
                  className="input"
                  placeholder="작품명을 입력해주세요"
                  onChange={onChangeName}
                  value={name}
                />
              </td>
            </tr>
            {/* 참가 공모전 */}
            <tr>
              <th className="th">
                <label>참가 공모전</label>
              </th>
              <td className="td">
                <input
                  required
                  className="input"
                  type="text"
                  placeholder="공모전을 검색하거나 등록해보세요"
                  onChange={onChangeComp}
                  value={comp}
                />
              </td>
            </tr>
            {/* 수상 결과 */}
            <tr>
              <th className="th">
                <label>수상 결과</label>
              </th>

              {/*<td className="td">*/}
              <select style={{ float: "left", width: "58.5%" }}>
                <option key="수상작" value="수상작" onChange={onChangeRes}>
                  수상작
                </option>
                <option key="참가작" value="참가작" onChange={onChangeRes}>
                  참가작
                </option>
              </select>
            </tr>
            {/* 카테고리 */}
            <tr>
              <th className="th" style={{ verticalAlign: "top" }}>
                <label>카테고리</label>
              </th>
              <td className="td">
                <div style={{ width: "65%" }}>
                  <div className="form_radio_btn" style={{ float: "left" }}>
                    <input
                      id="radio-1"
                      type="radio"
                      name="category"
                      value="idea"
                      onChange={onChangeCategory}
                    />
                    <label htmlFor="radio-1">기획/아이디어</label>
                  </div>
                  <div className="form_radio_btn" style={{ float: "left" }}>
                    <input
                      id="radio-2"
                      type="radio"
                      name="category"
                      value="marketing"
                      onChange={onChangeCategory}
                    />
                    <label htmlFor="radio-2">광고/마케팅</label>
                  </div>
                  <div className="form_radio_btn" style={{ float: "left" }}>
                    <input
                      id="radio-3"
                      type="radio"
                      name="category"
                      value="video"
                      onChange={onChangeCategory}
                    />
                    <label htmlFor="radio-3">영상</label>
                  </div>
                </div>
                <div style={{ width: "65%" }}>
                  <div className="form_radio_btn" style={{ float: "left" }}>
                    <input
                      id="radio-4"
                      type="radio"
                      name="category"
                      value="design"
                      onChange={onChangeCategory}
                    />
                    <label htmlFor="radio-4">디자인/사진</label>
                  </div>
                  <div className="form_radio_btn" style={{ float: "left" }}>
                    <input
                      id="radio-5"
                      type="radio"
                      name="category"
                      value="etc"
                      onChange={onChangeCategory}
                    />
                    <label htmlFor="radio-5">기타 아이디어</label>
                  </div>
                </div>
              </td>
            </tr>
            {/* 유튜브 링크 */}
            {category === "video" && (
              <tr>
                <th className="th">
                  <label>유튜브 링크</label>
                </th>
                <td className="td">
                  <input
                    required
                    type="text"
                    className="input"
                    placeholder="영상 작업물 업로드 시 유튜브 링크를 업로드 해주세요."
                    onChange={onChangeYoutubeLink}
                  />
                </td>
              </tr>
            )}

            {/* 표지사진 */}
            <tr>
              <th className="th">
                <label>표지사진</label>
              </th>
              <td className="td">
                <div
                  className="input"
                  style={{
                    color: "#B0B0B0",
                    fontSize: "70%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={onClickUpload_}
                >
                  {thumbnail === null ? (
                    <span>목록에 노출될 표시 사진을 업로드해주세요</span>
                  ) : (
                    <div>
                      <span>{thumbnail.name}&nbsp;</span>
                      <span
                        onClick={(e) => {
                          e.stopPropagation(); // 겹쳐진 영역 중복 클릭 방지
                          onClickDelete_();
                        }}
                      >
                        🗙
                      </span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileThumbnail}
                  onChange={handleFileChange_}
                  style={{ display: "none" }}
                  accept=".jpeg, .png, .jpg"
                />
              </td>
            </tr>
            {/* 첨부파일 */}
            {category !== "video" && (
              <tr>
                <th className="th" style={{ verticalAlign: "top" }}>
                  <label>첨부파일</label>
                </th>
                <td className="td">
                  <div
                    style={{
                      width: "60%",
                      height: "100px",
                      fontSize: "70%",
                      border: "1px solid #b0b0b0",
                      background: "#ffffff",
                      borderRadius: "10px",
                      textAlign: "left",
                      color: "#B0B0B0",
                      padding: "3px",
                      cursor: "pointer",
                      overflow: "auto",
                    }}
                    onClick={onClickUpload}
                  >
                    {uploads.length === 0 ? (
                      <span style={{ fontSize: "80%" }}>
                        PDF/JPEG/PNG/JPG 파일만 업로드 가능하며, PDF 파일을 1개
                        이상 올릴 시 다른 파일을 추가로 업로드할 수 없습니다.
                        <br />
                        (이미지 파일의 경우 복수 업로드 가능하며 파일 제목의
                        가나다순, 숫자의 경우 오름차순으로 업로드됩니다.)
                      </span>
                    ) : (
                      <div>
                        {uploads.map((upload) => (
                          <span key={upload.name}>
                            {upload.name}&nbsp;
                            <span
                              onClick={(e) => {
                                e.stopPropagation(); // 겹쳐진 영역에서의 이중 클릭 이벤트 방지
                                onClickDelete(upload.name);
                              }}
                            >
                              🗙
                            </span>
                            <br />
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInput}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    accept=".pdf, .jpg, .jpeg, .png, .mp4, .wav"
                    multiple="multiple"
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Style.Button
        disabled={!buttonColor}
        state={buttonColor}
        onClick={onClickRegister}
        style={{ marginTop: "30px", marginBottom: "30px" }}
      >
        등록하기
      </Style.Button>
    </div>
  );
}

export default ManageShareContainer;
