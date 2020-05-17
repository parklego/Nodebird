import React from "react";

const User = ({ id }) => {
  return <div>user {id} page</div>;
};

User.getInitialProps = async (context) => {
  console.log("user get", context.query.id);
  return { id: parseInt(context.query.id, 10) };
};

export default User;
