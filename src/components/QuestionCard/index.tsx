import * as React from "react";
import styled from "./index.module.scss";
import { Button, Divider, message, Modal, Space, Tag, Tooltip } from "antd";
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  LineChartOutlined,
  StarFilled,
  StarOutlined
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

interface IProps {
  _id: string;
  title?: string;
  isPublish?: boolean;
  isStar?: boolean;
  answerCount?: number;
  createdAt?: string;
}

export const QuestionCard: React.FC<IProps> = ({ _id, title, createdAt, isPublish, isStar }) => {
  const navigate = useNavigate();

  function handleDelete() {
    Modal.confirm({
      title: "确认删除?",
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        message.success("删除成功");
      }
    });
  }

  return (
    <div className={styled.container}>
      <div className={styled.title}>
        <div className={styled.left}>
          <Space>
            {isStar ? <StarOutlined style={{ color: "red" }} /> : ""}
            <Link to={isPublish ? `/question/stat/${_id}` : `/question/edit/${_id}`}>{title}</Link>
          </Space>
        </div>
        <div className={styled.right}>
          <Space>
            {isPublish ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
            <span>{createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider />
      <div className={styled[`button-container`]}>
        <div className={styled.left}>
          <Space>
            <Button type="text" size="small" icon={<EditOutlined />} onClick={() => navigate(`/question/edit/${_id}`)}>
              编辑问卷
            </Button>
            <Button
              type="text"
              size="small"
              icon={<LineChartOutlined />}
              disabled={!isPublish}
              onClick={() => navigate(`/question/stat/${_id}`)}
            >
              数据统计
            </Button>
          </Space>
        </div>
        <div className={styled.right}>
          <Space>
            <Tooltip title="标记">
              <Button shape="circle" size="small" icon={!isStar ? <StarOutlined /> : <StarFilled />} />
            </Tooltip>
            <Tooltip title="复制">
              <Button shape="circle" size="small" icon={<CopyOutlined />} />
            </Tooltip>
            <Tooltip title="删除">
              <Button shape="circle" size="small" icon={<DeleteOutlined />} onClick={handleDelete} />
            </Tooltip>
          </Space>
        </div>
      </div>
    </div>
  );
};
