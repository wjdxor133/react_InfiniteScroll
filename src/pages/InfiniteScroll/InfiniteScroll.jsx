import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { ImSearch } from "react-icons/im";
import DogImgList from "../../components/DogImgList/DogImgList";
import Loading from "../../components/Loading/Loading";

const InfiniteScroll = () => {
  const [data, setData] = useState([]); // 강아지 전체 이미지 데이터
  const [imgList, setImgList] = useState([]); // 화면에 보여질 강아지 이미지 데이터
  const [dogCategory, setDogCategory] = useState(""); // 검색 할 강아지 종류
  const [loading, setLoading] = useState(false); // 화면 로딩 여부
  const [errorChecked, setErrorChecked] = useState(false); // 에러 메시지 여부
  const [errorMessage, setErrorMessage] = useState(""); // status에 따라 표시되는 오류 메시지

  // 강아지 이미지 데이터 검색
  const handleSearch = async () => {
    setLoading(true);
    setErrorChecked(false);
    await axios
      .get(`https://dog.ceo/api/breed/${dogCategory}/images`)
      .then((res) => {
        setData(res.data.message);
        setImgList(res.data.message.slice(0, 40));
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      })
      .catch((error) => {
        if (error.response.status === 400 || 404) {
          setErrorChecked(true);
          setLoading(false);
          setErrorMessage("개 종류를 영소문자로 다시 입력해주세요.");
        } else if (error.response.status === 500 || 503) {
          setErrorMessage("일시적인 오류가 발생했습니다.");
        }
      });
  };

  // 엔터 입력 함수
  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      handleSearch();
    }
  };

  // 무한 스크롤 이벤트
  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

    // 스크롤 4분의 3 지점에서 이벤트 발생
    if (scrollHeight - scrollHeight / 4 - scrollTop < clientHeight) {
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
            placeholder="개 종류를 영소문자로 입력하시오."
            onChange={(e) => setDogCategory(e.target.value.toLowerCase())}
            onKeyPress={handleKeyPress}
          ></SearchInput>
          <SearchButton onClick={handleSearch}>
            <ImSearch size="16" />
          </SearchButton>
        </SearchBox>
      </Header>
      {loading ? <Loading /> : null}
      {errorChecked ? (
        <ErrorMessageText>{errorMessage}</ErrorMessageText>
      ) : (
        <DogImgList loading={`${loading}`} Imgdata={imgList} />
      )}
    </ScrollPage>
  );
};

export default InfiniteScroll;

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
  margin-bottom: 2rem;
`;

const SearchBox = styled.div`
  width: 50%;
  display: flex;
  background-color: #efefef;
  border-radius: 30px;
  align-items: center;
  padding: 0.3rem 0.8rem;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
`;

const SearchInput = styled.input`
  width: 92%;
  font-size: 1.1rem;
  margin: 1rem;
`;

const SearchButton = styled.button`
  width: 8%;
  background-color: #000;
  color: white;
  font-weight: bold;
  padding: 1rem;
  border-radius: 50%;

  :hover {
    background-color: rgba(0, 0, 0, 0.75);
    cursor: pointer;
  }
`;

const ErrorMessageText = styled.p`
  text-align: center;
  font-weight: bold;
  font-size: 1.5rem;
`;
