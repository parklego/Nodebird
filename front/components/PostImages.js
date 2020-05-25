import React from "react";
import { Icon } from "antd";

const PostImages = ({ images }) => {
  if (images.length === 1) {
    return <img src={`http://localhost:8080/${images[0].src}`} />;
  }
  if (images.length === 2) {
    return (
      <div>
        <img src={`http://localhost:8080/${images[0].src}`} width="50%" />
        <img src={`http://localhost:8080/${images[1].src}`} width="50%" />
      </div>
    );
  }
  return (
    <div>
      <img src={`http://localhost:8080/${images[0].src}`} width="50%" />
      <div
        style={{
          display: "inline-block",
          width: "50%",
          textAlign: "center",
          verticalAlign: "middle",
        }}
      >
        <Icon type="plus" />
        <br />
        {images.length - 1}개의 사진 더보기
      </div>
    </div>
  );
};

export default PostImages;
