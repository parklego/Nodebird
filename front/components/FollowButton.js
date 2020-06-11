import React, { memo } from "react";
import { Button } from "antd";
import { useSelector } from "react-redux";

const FollowButton = memo(({ post, onFollow, onUnfollow }) => {
  const { me } = useSelector((state) => state.user);
  return !me || post.User.id === me.id ? null : me.Followings &&
    me.Followings.find((v) => v.id === post.User.id) ? (
    <Button onClick={onUnfollow(post.User.id)}>언팔로우</Button>
  ) : (
    <Button onClick={onFollow(post.User.id)}>팔로우</Button>
  );
});

export default FollowButton;
