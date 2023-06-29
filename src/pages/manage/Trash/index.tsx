import * as React from "react";
import styled from "../style/common.module.scss";
import { Empty, Typography, Table, TableColumnsType, Tag, Space, Button, Modal, message, Pagination } from "antd";
import { useTitle } from "ahooks";
import { useEffect, useState } from "react";
import { SearchList } from "../../../components/SearchList";
import { useLoadQuestionList } from "../../../hooks/question.ts";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export const Trash = () => {
  useTitle("Questionnaire Master / Trash");
  const [selectIds, setSelectIds] = useState<string[]>([]);

  const { loading, data = {} } = useLoadQuestionList({ isDeleted: true });
  const { list = [], total } = data;

  const columns: TableColumnsType<(typeof list)[0]> = [
    { title: "标题", dataIndex: "title", align: "center" },
    {
      title: "是否发布",
      dataIndex: "isPublish",
      align: "center",
      render(value) {
        return value ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>;
      }
    },
    { title: "答卷统计", dataIndex: "answerCount", align: "center" },
    { title: "创建时间", dataIndex: "createdAt", align: "center" }
  ];

  function handleRemove() {
    Modal.confirm({
      title: "确认删除?",
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        message.success("删除成功");
      }
    });
  }

  const TableEle = (
    <>
      <Space style={{ marginBottom: "20px" }}>
        <Button type="primary" disabled={selectIds.length === 0}>
          恢复
        </Button>
        <Button danger disabled={selectIds.length === 0} onClick={handleRemove}>
          彻底删除
        </Button>
      </Space>
      <Table
        dataSource={list}
        columns={columns}
        pagination={false}
        rowKey={({ _id }) => _id}
        rowSelection={{
          type: "checkbox",
          onChange(selectRowKeys) {
            setSelectIds(selectRowKeys as string[]);
          }
        }}
      />
    </>
  );
  return (
    <>
      <header className={styled.header}>
        <div className={styled.left}>
          <Typography.Title level={3}>回收站</Typography.Title>
        </div>
        <div className={styled.right}>
          <SearchList />
        </div>
      </header>
      <div className={styled.content}>
        {list.length === 0 && <Empty />}
        {!loading && list.length > 0 && TableEle}
      </div>
      <footer className={styled.footer}>
        <CustomPagination total={total} />
      </footer>
    </>
  );
};

interface ICustomPaginationProps {
  total: number;
}

const CustomPagination: React.FC<ICustomPaginationProps> = ({ total }) => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "", 10) || 1;
    const size = parseInt(searchParams.get("size") || "", 10) || 10;
    setCurrent(page);
    setPageSize(size);
  }, [searchParams]);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleChange = (page: number, size: number) => {
    searchParams.set("page", page.toString());
    searchParams.set("size", size.toString());

    navigate({
      pathname,
      search: searchParams.toString()
    });
  };

  return <Pagination current={current} pageSize={pageSize} total={total} onChange={handleChange} />;
};
