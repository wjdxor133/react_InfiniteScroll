import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loading = () => {
  return (
    <LoadingComponent>
      <LoadingTextBox>
        <LoadingText>LOADING...</LoadingText>
        <CircularProgress disableShrink />
      </LoadingTextBox>
    </LoadingComponent>
  );
};

export default Loading;

const LoadingComponent = styled.div`
  width: 100%;
  margin-top: 0.5em;
`;

const LoadingTextBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingText = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
`;
