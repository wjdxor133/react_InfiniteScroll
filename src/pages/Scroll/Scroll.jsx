import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import DogImgList from "../../components/DogImgList/DogImgList";
import Loading from "../../components/Loading/Loading";

const Scroll = () => {
  const [data, setData] = useState([]); // 강아지 전체 이미지 데이터
  const [imgList, setImgList] = useState([]); // 화면에 보여질 강아지 이미지 데이터
  const [dogCategory, setDogCategory] = useState(""); // 검색 할 강아지 종류
  const [loading, setLoading] = useState(false); // 화면 로딩 여부

  // 강아지 이미지 데이터 검색
  const handleSearch = async () => {
    setLoading(true);
    await axios
      .get(`https://dog.ceo/api/breed/${dogCategory}/images`)
      .then((res) => {
        setData(res.data.message);
        setImgList(res.data.message.slice(0, 20));
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };

  // 무한 스크롤 이벤트
  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

    if (scrollHeight - scrollHeight / 2.5 - scrollTop < clientHeight) {
      setImgList(data.slice(0, imgList.length + 10));
    }
  };

  useEffect(() => {}, [dogCategory, imgList, loading]);

  return (
    <ScrollPage onScroll={handleScroll}>
      <Header>
        <SearchBox>
          <SearchInput
            value={dogCategory}
            type="text"
            placeholder="입력해주세요."
            onChange={(e) => setDogCategory(e.target.value)}
            onKeyPress={handleSearch}
          ></SearchInput>
          <SearchButton onClick={handleSearch}>검색</SearchButton>
        </SearchBox>
      </Header>
      {loading && <Loading />}
      <DogImgList loading={loading} Imgdata={imgList} />
    </ScrollPage>
  );
};

export default Scroll;

const ScrollPage = styled.main`
  width: 100%;
  height: 100vh;
  overflow: auto;
`;

const Header = styled.header`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchBox = styled.div`
  width: 20%;
  display: flex;
  background-color: #c4c4c4;
  border-radius: 2px;
`;

const SearchInput = styled.input`
  width: 80%;
  padding: 0.5em;
`;

const SearchButton = styled.button`
  width: 20%;
  background-color: #000;
  color: white;
  font-weight: bold;
  padding: 0 1em;

  :hover {
    cursor: pointer;
  }
`;
