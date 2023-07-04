import * as React from "react";
import { Input, Typography } from "antd";
import { IQuestionnaireInputProps } from "./type.ts";

type TProps = Partial<IQuestionnaireInputProps>;

export const QNInput: React.FC<TProps> = ({ title = "标题", placeholder = "输入提示" }) => {
  return (
    <div>
      <Typography.Paragraph strong>{title}</Typography.Paragraph>
      <div>
        <Input placeholder={placeholder} />
      </div>
    </div>
  );
};
