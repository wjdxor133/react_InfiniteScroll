import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import ImgList from "../../components/ImgList/ImgList";

const Main = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await axios
        .get("https://dog.ceo/api/breed/hound/images")
        .then((response) => {
          //   console.log("result", response);
          setData(response.data.message);
        })
        .catch((error) => {
          console.log("error", error);
        });
    };
    getData();
  }, []);
  //   console.log("data", data);
  return (
    <MainPage>
      <ImgList data={data} />
    </MainPage>
  );
};

export default Main;

const MainPage = styled.main`
  width: 100%;
  height: 100vh;
`;
