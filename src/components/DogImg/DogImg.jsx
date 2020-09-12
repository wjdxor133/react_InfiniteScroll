import React from "react";
import styled from "styled-components";

const DogImg = ({ img }) => {
  return (
    <DogImgComponent>
      <ImgBox src={`${img}`} alt={`${img}`} />
    </DogImgComponent>
  );
};

export default DogImg;

const DogImgComponent = styled.li`
  width: 240px;
  height: 240px;
  padding: 1em;
`;

const ImgBox = styled.img`
  width: 100%;
  height: 100%;
`;
