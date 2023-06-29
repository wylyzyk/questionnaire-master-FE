import * as React from "react";
import styled from "../style/common.module.scss";
import { QuestionCard } from "../../../components/QuestionCard";
import { useTitle } from "ahooks";
import { Empty, Spin, Typography } from "antd";
import { SearchList } from "../../../components/SearchList";
import { useLoadQuestionList } from "../../../hooks/question.ts";

export const List: React.FC = () => {
  useTitle("Questionnaire Master / List");

  const { data = {}, loading } = useLoadQuestionList();
  const { list = [] } = data;

  return (
    <>
      <header className={styled.header}>
        <div className={styled.left}>
          <Typography.Title level={3}>我的问卷</Typography.Title>
        </div>
        <div className={styled.right}>
          <SearchList />
        </div>
      </header>
      <div className={styled.content}>
        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty />}
        {!loading &&
          list.length > 0 &&
          list.map((item: any) => {
            return <QuestionCard key={item._id} {...item} />;
          })}
      </div>
      <footer className={styled.footer}>上滑加载更多...</footer>
    </>
  );
};
