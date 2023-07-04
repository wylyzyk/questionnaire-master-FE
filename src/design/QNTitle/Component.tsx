import * as React from "react";
import { IQuestionnaireTitleProps } from "./type.ts";
import { Typography } from "antd";

type TProps = Partial<IQuestionnaireTitleProps>;

export const QNTitle: React.FC<TProps> = ({ text = "标题", level = 1, isCenter = false }) => {
  return (
    <Typography.Title level={level} style={{ textAlign: isCenter ? "center" : "left", marginBottom: 0 }}>
      {text}
    </Typography.Title>
  );
};
