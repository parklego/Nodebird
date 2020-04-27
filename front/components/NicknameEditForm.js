import React from "react";
import { Form, Input, Button } from "antd";

const dummyUser = {
  name: "에이프",
};
const NicknameEditForm = () => {
  return (
    <Form
      style={{
        marginBottom: "20px",
        border: "1px solid #d9d9d9",
        padding: "20px",
      }}
    >
      <Input value={dummyUser.name} addonBefore="닉네임" />
      <Button type="primary">수정</Button>
    </Form>
  );
};

export default NicknameEditForm;
