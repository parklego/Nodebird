import React from "react";

const Hashtag = ({ tag }) => {
  return <div>Hashtag {tag} page</div>;
};

Hashtag.getInitialProps = async (context) => {
  console.log("hashtag getInitialProps ", context.query.tag);
  return { tag: context.query.tag };
};

export default Hashtag;
