import React, { memo } from "react";
import { Button, Card, Icon, List } from "antd";

const FollowList = memo(
  ({ header, hasMore, onClickMore, data, onClickStop }) => {
    return (
      <List
        style={{ marginBottom: "20px" }}
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size="small"
        header={<div>{header} </div>}
        loadMore={
          hasMore && (
            <Button style={{ width: "100%" }} onClick={onClickMore}>
              더 보기
            </Button>
          )
        }
        borderd
        dataSource={data}
        renderItem={(item) => (
          <List.Item style={{ marginTop: "20px" }}>
            <Card
              actions={[
                <Icon key="icon" type="stop" onClick={onClickStop(item.id)} />,
              ]}
            >
              <Card.Meta description={item.nickname} />
            </Card>
          </List.Item>
        )}
      />
    );
  }
);

export default FollowList;
