import React from "react";
import { Card, Avatar } from "antd";

const dummy = {
  isLoggedIn: true,
  imagePaths: [],
  mainPosts: [
    {
      User: {
        id: 1,
        nicname: "에이프",
      },
      content: "첫 번째 게시글",
      img: "",
    },
  ],
};

const UserProfile = () => {
  return (
    <Card
      actions={[
        <div key="twit">
          짹쨱
          <br />
          {dummy.post.length}
        </div>,
        <div key="following">
          팔로잉
          <br />
          {dummy.Followings.length}
        </div>,
        <div key="follower">
          팔로워
          <br />
          {dummy.Follwers.length}
        </div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{dummy.nickname[0]}</Avatar>}
        title={dummy.nickname}
      />
    </Card>
  );
};

export default UserProfile;
