import React, { useState, useCallback } from "react";
import { Icon } from "antd";
import ImagesZoom from "./imagesZoom";

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);
  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);
  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <img src={`http://localhost:8080/${images[0].src}`} onClick={onZoom} />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <div>
          <img
            src={`http://localhost:8080/${images[0].src}`}
            width="50%"
            onClick={onZoom}
          />
          <img
            src={`http://localhost:8080/${images[1].src}`}
            width="50%"
            onClick={onZoom}
          />
          {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
        </div>
      </>
    );
  }
  return (
    <>
      <div>
        <img
          src={`http://localhost:8080/${images[0].src}`}
          width="50%"
          onClick={onZoom}
        />
        <div
          style={{
            display: "inline-block",
            width: "50%",
            textAlign: "center",
            verticalAlign: "middle",
          }}
          onClick={onZoom}
        >
          <Icon type="plus" />
          <br />
          {images.length - 1}
          개의 사진 더보기
        </div>
      </div>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  );
};

export default PostImages;
