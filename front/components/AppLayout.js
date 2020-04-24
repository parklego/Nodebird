import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { Menu, Input, Row, Col, Card, Avatar } from "antd";
import LoginForm from "../components/LoginForm";

const dummy = {
  nickname: "에이프",
  post: [],
  Followings: [],
  Follwers: [],
  isLoggedIn: false,
};

const AppLayout = ({ children }) => {
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/">
            <a>노드버드</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="mail">
          <Input.Search enterButton style={{ verticalAlign: "middle" }} />
        </Menu.Item>
      </Menu>
      <Row gutter={10}>
        <Col xs={24} md={6}>
          {dummy.isLoggedIn ? (
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
          ) : (
            <LoginForm />
          )}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}></Col>
      </Row>
    </div>
  );
};

AppLayout.prototype = {
  children: PropTypes.node,
};
export default AppLayout;
