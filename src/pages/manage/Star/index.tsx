import { useState } from "react";
import styled from "../style/common.module.scss";
import { Typography, Empty } from "antd";
import { QuestionCard } from "../../../components/QuestionCard";
import { useTitle } from "ahooks";
import { SearchList } from "../../../components/SearchList";

const initialStarList = [
  { _id: "q1", title: "问卷01", isPublish: false, isStar: true, answerCount: 5, createdAt: "03/10 13:05" },
  { _id: "q2", title: "问卷02", isPublish: false, isStar: true, answerCount: 5, createdAt: "03/10 13:05" },
  { _id: "q3", title: "问卷03", isPublish: false, isStar: true, answerCount: 5, createdAt: "03/10 13:05" }
];

export const Star = () => {
  useTitle("Questionnaire Master / Star");
  const [starList] = useState(initialStarList);
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
        {starList.length === 0 && <Empty />}
        {starList.length > 0 &&
          starList.map((item) => {
            return <QuestionCard key={item._id} {...item} />;
          })}
      </div>
      <footer className={styled.footer}>上滑加载更多...</footer>
    </>
  );
};
