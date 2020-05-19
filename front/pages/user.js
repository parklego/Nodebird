import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Card } from "antd";
import { LOAD_USER_POSTS_REQUEST } from "../reducers/post";
import PostCard from "../components/PostCard";
import { LOAD_USER_REQUEST } from "../reducers/user";

const User = ({ id }) => {
  const dispatch = useDispatch();
  const { mainPosts } = useSelector((state) => state.post);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch({
      type: LOAD_USER_REQUEST,
      data: id,
    });
    dispatch({
      type: LOAD_USER_POSTS_REQUEST,
      data: id,
    });
  }, []);
  return (
    <div>
      {userInfo ? (
        <Card
          actions={[
            <div key="twit">
              짹짹
              <br />
              {userInfo.Posts}
            </div>,
            <div key="following">
              팔로잉
              <br />
              {userInfo.Followings}
            </div>,
            <div key="follower">
              팔로워
              <br />
              {userInfo.Followers}
            </div>,
          ]}
        >
          <Card.Meta
            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
            title={userInfo.nickname}
          />
        </Card>
      ) : null}
      {mainPosts.map((c) => (
        <PostCard key={c.createdAt.valueOf()} post={c} />
      ))}
    </div>
  );
};

User.getInitialProps = async (context) => {
  //   console.log("user get", context.query.id);
  return { id: parseInt(context.query.id, 10) };
};

export default User;
