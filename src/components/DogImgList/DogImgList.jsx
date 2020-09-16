import React from "react";
import styled from "styled-components";
import DogImg from "../DogImg/DogImg";

const ImgList = ({ Imgdata, loading }) => {
  return (
    <ImgListComponent loading={`${loading}`}>
      {Imgdata.map((img, idx) => {
        return <DogImg key={idx} img={img} />;
      })}
    </ImgListComponent>
  );
};

export default ImgList;

const ImgListComponent = styled.ul`
  width: 80%;
  margin: 0 auto;
  display: flex;
  display: ${(props) => (props.loading === "true" ? "none" : "flex")};
  flex-wrap: wrap;
`;
