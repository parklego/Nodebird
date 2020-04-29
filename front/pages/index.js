import React, { useEffect } from "react";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { useDispatch, useSelector } from "react-redux";
// import { connect } from "react-redux";

// const Home = ({ user, dispatch, login, logout }) => {
const Home = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch({
      type: "HELLO_SAGA",
    });
  }, []);

  return (
    <div>
      {isLoggedIn && <PostForm />}
      {mainPosts.map((c) => {
        return <PostCard key={c} post={c} />;
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
export default Home;
