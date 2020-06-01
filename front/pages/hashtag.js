import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_HASHTAG_POSTS_REQUEST } from "../reducers/post";
import PostCard from "../components/PostCard";

const Hashtag = ({ tag }) => {
  const { mainPosts } = useSelector((state) => state.post);

  return (
    <div>
      {mainPosts.map((c) => (
        <PostCard key={c.createdAt.valueOf()} post={c} />
      ))}
    </div>
  );
};

Hashtag.getInitialProps = async (context) => {
  // console.log("hashtag getInitialProps ", context.query.tag);
  const tag = context.query.tag;
  context.store.dispatch({
    type: LOAD_HASHTAG_POSTS_REQUEST,
    data: tag,
  });
  return { tag };
};

export default Hashtag;
