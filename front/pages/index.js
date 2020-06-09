import React, { useEffect, useRef, useCallback } from "react";
import PostForm from "../containers/PostForm";
import PostCard from "../containers/PostCard";
import { useSelector, useDispatch } from "react-redux";
import { LOAD_MAIN_POSTS_REQUEST } from "../reducers/post";
// import { connect } from "react-redux";

// const Home = ({ user, dispatch, login, logout }) => {
const Home = () => {
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePost } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const countRef = useRef([]);

  const onScroll = useCallback(() => {
    // console.log(
    //   window.scrollY, // 스크린 내린 거리
    //   document.documentElement.clientHeight, // 화면 높이
    //   document.documentElement.scrollHeight // 전체 화면 길이
    // );
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 300
    ) {
      if (hasMorePost) {
        const lastId = mainPosts[mainPosts.length - 1].id;
        if (!countRef.current.includes(lastId)) {
          dispatch({
            type: LOAD_MAIN_POSTS_REQUEST,
            lastId,
          });
        }

        countRef.current.push(lastId);
      }
    }
  }, [hasMorePost, mainPosts.length]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [mainPosts.length]);

  return (
    <div>
      {me && <PostForm />}
      {mainPosts.map((c) => {
        return <PostCard key={c.createdAt.valueOf()} post={c} />;
      })}
    </div>
  );
};

// function mapStateToProps(state) {
//   return {
//     user: state.user,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     login: () => dispatch(loginAction),
//     logout: () => dispatch(logoutAction),
//   };
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Home);

Home.getInitialProps = async (context) => {
  // console.log(Object.keys(context));
  context.store.dispatch({
    type: LOAD_MAIN_POSTS_REQUEST,
  });
};
export default Home;
