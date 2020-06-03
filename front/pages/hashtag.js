import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_HASHTAG_POSTS_REQUEST } from "../reducers/post";
import PostCard from "../components/PostCard";

const Hashtag = ({ tag }) => {
  const dispatch = useDispatch();

  const { mainPosts, hasMorePost } = useSelector((state) => state.post);

  const onScroll = useCallback(() => {
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 300
    ) {
      if (hasMorePost) {
        dispatch({
          type: LOAD_HASHTAG_POSTS_REQUEST,
          lastId:
            mainPosts[mainPosts.length - 1] &&
            mainPosts[mainPosts.length - 1].id,
          data: tag,
        });
      }
    }
  }, [hasMorePost, mainPosts.length, tag]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [mainPosts.length, hasMorePost, tag]);

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
