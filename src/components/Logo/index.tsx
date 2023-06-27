import { Space, Typography } from "antd";
import { FormOutlined } from "@ant-design/icons";
import styled from "./index.module.scss";
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <div className={styled.container}>
      <Link to="/">
        <Space>
          <Typography.Title>
            <FormOutlined />
          </Typography.Title>
          <Typography.Title>Questionnaire Master</Typography.Title>
        </Space>
      </Link>
    </div>
  );
};
