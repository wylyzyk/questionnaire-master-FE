import * as React from "react";
import { IQuestionnaireParagraphProps } from "./type.ts";
import { Typography } from "antd";

export const QNParagraph: React.FC<IQuestionnaireParagraphProps> = (props) => {
  const { text = "一行段落", isCenter = false } = props;

  const textArr = text.split("\n");

  return (
    <Typography.Paragraph style={{ textAlign: isCenter ? "center" : "start", marginBottom: 0 }}>
      {textArr.map((t, index) => (
        <span key={index}>{t}<br /></span>
      ))}
    </Typography.Paragraph>
  );
};
