import { useNavigate } from "react-router-dom";
import styled from "./index.module.scss";
import { Button, Typography } from "antd";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styled.container}>
      <div className={styled.info}>
        <Typography.Title>问卷大师 | 不止问卷</Typography.Title>
        <Typography.Paragraph>已累计创建问卷 100 份, 发布问卷 90 份, 收到答卷 980 份</Typography.Paragraph>
        <div>
          <Button type="primary" onClick={() => navigate("/login")}>
            快速开始
          </Button>
        </div>
      </div>
    </div>
  );
};
