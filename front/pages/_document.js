import React from "react";
import { Helmet } from "react-helmet";
import Document, { Main, NextScript } from "next/document";

// 리액트에서는 Component를 extends하지만 넥스트는 Document를 extends한다!

class MyDocument extends Document {
  static getInitialProps(context) {
    const page = context.renderPage((App) => (props) => <App {...props} />);
    return { ...page, helmet: Helmet.renderStatic() };
  }

  render() {
    const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;
    const htmlAttrs = htmlAttributes.toComponent();
    const bodyAttrs = bodyAttributes.toComponent();
    return (
      <html {...htmlAttrs}>
        <head>{Object.values(helmet).map((el) => el.toComponent())}</head>
        <body {...bodyAttrs}>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
