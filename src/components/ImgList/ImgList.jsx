import React from "react";
import styled from "styled-components";
import DogImg from "../DogImg/DogImg";

const ImgList = ({ data }) => {
  return (
    <ImgListComponent>
      {data &&
        data.map((img, idx) => {
          console.log("hi");
          return <DogImg key={idx} img={img} />;
        })}
    </ImgListComponent>
  );
};

export default ImgList;

const ImgListComponent = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
