import styled from "../style/common.module.scss";
import { Empty, Typography, Table, TableColumnsType, Tag, Space, Button, Modal, message } from "antd";
import { useTitle } from "ahooks";
import { useState } from "react";
import { SearchList } from "../../../components/SearchList";

const initialTrashList = [
  { _id: "q1", title: "问卷01", isPublish: true, isStar: false, answerCount: 5, createdAt: "03/10 13:05" },
  { _id: "q2", title: "问卷02", isPublish: false, isStar: true, answerCount: 5, createdAt: "03/10 13:05" },
  { _id: "q3", title: "问卷03", isPublish: true, isStar: false, answerCount: 5, createdAt: "03/10 13:05" },
  { _id: "q4", title: "问卷04", isPublish: true, isStar: false, answerCount: 5, createdAt: "03/10 13:05" },
  { _id: "q5", title: "问卷05", isPublish: false, isStar: true, answerCount: 5, createdAt: "03/10 13:05" }
];

export const Trash = () => {
  useTitle("Questionnaire Master / Trash");
  const [trashList] = useState(initialTrashList);
  const [selectIds, setSelectIds] = useState<string[]>([]);

  const columns: TableColumnsType<(typeof initialTrashList)[0]> = [
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
        dataSource={trashList}
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
        {trashList.length === 0 && <Empty />}
        {trashList.length > 0 && TableEle}
      </div>
      <footer className={styled.footer}>上滑加载更多...</footer>
    </>
  );
};
