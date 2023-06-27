import * as React from "react";
import styled from "../style/common.module.scss";
import { QuestionCard } from "../../../components/QuestionCard";
import { useTitle } from "ahooks";
import { Empty, Typography } from "antd";
import { SearchList } from "../../../components/SearchList";

const initialQuestionState = [
  { _id: "q1", title: "问卷01", isPublish: false, isStar: false, answerCount: 5, createdAt: "03/10 13:05" },
  { _id: "q2", title: "问卷02", isPublish: false, isStar: true, answerCount: 5, createdAt: "03/10 13:05" },
  { _id: "q3", title: "问卷03", isPublish: false, isStar: false, answerCount: 5, createdAt: "03/10 13:05" },
  { _id: "q4", title: "问卷04", isPublish: false, isStar: false, answerCount: 5, createdAt: "03/10 13:05" },
  { _id: "q5", title: "问卷05", isPublish: false, isStar: true, answerCount: 5, createdAt: "03/10 13:05" }
];
export const List: React.FC = () => {
  useTitle("Questionnaire Master / List");
  const [questionList] = React.useState(initialQuestionState);

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
        {questionList.length === 0 && <Empty />}
        {questionList.length > 0 &&
          questionList.map((item) => {
            return <QuestionCard key={item._id} {...item} />;
          })}
      </div>
      <footer className={styled.footer}>上滑加载更多...</footer>
    </>
  );
};
