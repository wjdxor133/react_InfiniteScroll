import React from "react";
import styled from "styled-components";

const DogImg = ({ img }) => {
  return (
    <DogImgComponent>
      <ImgBox src={`${img}`} alt=" " />
    </DogImgComponent>
  );
};

export default DogImg;

const DogImgComponent = styled.li`
  width: 100%;
  height: 100%;
`;

const ImgBox = styled.img`
  width: 150px;
  height: 150px;
`;
