import styled from "../style/common.module.scss";
import { Typography, Empty, Spin } from "antd";
import { QuestionCard } from "../../../components/QuestionCard";
import { useTitle } from "ahooks";
import { SearchList } from "../../../components/SearchList";
import { useLoadQuestionList } from "../../../hooks/question.ts";

export const Star = () => {
  useTitle("Questionnaire Master / Star");
  const { data = {}, loading } = useLoadQuestionList({ isStar: true });
  const { list = [] } = data;

  return (
    <>
      <header className={styled.header}>
        <div className={styled.left}>
          <Typography.Title level={3}>标星问卷</Typography.Title>
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
