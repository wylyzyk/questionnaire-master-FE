import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "./index.module.scss";
import { Button, Space, Divider } from "antd";
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from "@ant-design/icons";

export const Manage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className={styled.container}>
      <div className={styled.left}>
        <Space direction="vertical">
          <Button type="primary" size="large" icon={<PlusOutlined />}>
            创建问卷
          </Button>
          <Divider />
          <Button
            type={pathname.startsWith("/manage/list") ? "dashed" : "text"}
            icon={<BarsOutlined />}
            onClick={() => navigate("/manage/list")}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith("/manage/star") ? "dashed" : "text"}
            icon={<StarOutlined />}
            onClick={() => navigate("/manage/star")}
          >
            标星问卷
          </Button>
          <Button
            type={pathname.startsWith("/manage/trash") ? "dashed" : "text"}
            icon={<DeleteOutlined />}
            onClick={() => navigate("/manage/trash")}
          >
            回收站&#12288;
          </Button>
        </Space>
      </div>
      <div className={styled.right}>
        <Outlet />
      </div>
    </div>
  );
};
