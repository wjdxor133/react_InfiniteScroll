import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import ImgList from "../../components/ImgList/ImgList";

const Scroll = () => {
  const [data, setData] = useState([]);
  const [imgList, setImgList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

    if (scrollHeight - Math.ceil(scrollTop) === clientHeight) {
      setLoading(true);
      setImgList(data.slice(0, imgList.length + 10));
      setLoading(false);
    }
  };

  useEffect(() => {
    const getData = async () => {
      await axios
        .get("https://dog.ceo/api/breed/hound/images")
        .then((res) => {
          //   console.log("result", response);
          setData(res.data.message);
          setImgList(res.data.message.slice(0, 20));
        })
        .catch((error) => {
          console.log("error", error);
        });
    };
    getData();
  }, []);

  useEffect(() => {}, [imgList]);

  return (
    <ScrollPage onScroll={handleScroll}>
      <ImgList Imgdata={imgList} loading={loading} />
    </ScrollPage>
  );
};

export default Scroll;

const ScrollPage = styled.main`
  width: 100%;
  height: 100vh;
  overflow: auto;
`;
