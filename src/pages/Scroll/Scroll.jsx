import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import DogImgList from "../../components/DogImgList/DogImgList";

const Scroll = () => {
  const [data, setData] = useState([]);
  const [imgList, setImgList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  // 데이터 검색
  const handleSearch = async () => {
    await axios
      .get(`https://dog.ceo/api/breed/${searchValue}/images`)
      .then((res) => {
        //   console.log("result", response);
        setData(res.data.message);
        setImgList(res.data.message.slice(0, 20));
      })
      .catch((error) => {
        console.log("error", error);
        alert("데이터가 존재하지 않습니다.");
      });
  };

  // 무한 스크롤 이벤트
  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

    if (scrollHeight - Math.ceil(scrollTop) === clientHeight) {
      setImgList(data.slice(0, imgList.length + 10));
    }
  };

  useEffect(() => {}, [imgList, searchValue]);

  // console.log("searchValue", searchValue);
  // console.log("data", data);
  console.log("imgList", imgList);

  return (
    <ScrollPage onScroll={handleScroll}>
      <Header>
        <SearchBox>
          <SearchInput
            value={searchValue}
            placeholder="입력"
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={handleSearch}
          ></SearchInput>
          <SearchButton onClick={handleSearch}>검색</SearchButton>
        </SearchBox>
      </Header>
      <DogImgList Imgdata={imgList} />
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
  display: flex;
  background-color: #c4c4c4;
  border-radius: 2px;
`;

const SearchInput = styled.input`
  padding: 0.5em;
`;

const SearchButton = styled.button`
  background-color: #000;
  color: white;
  font-weight: bold;
  padding: 0 1em;

  :hover {
    cursor: pointer;
  }
`;
