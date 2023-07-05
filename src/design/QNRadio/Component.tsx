import * as React from "react";
import { defaultRadioProps, IQuestionnaireRadioProps } from "./type.ts";
import { Radio, Space, Typography } from "antd";

export const QNRadio: React.FC<IQuestionnaireRadioProps> = (props) => {
  const { title, options, isVertical, value } = { ...defaultRadioProps, ...props };

  return (
    <div>
      <Typography.Paragraph strong>{title}</Typography.Paragraph>
      <Radio.Group value={value}>
        <Space direction={isVertical ? "vertical" : "horizontal"}>
          {options?.map((o) => {
            return (
              <Radio key={o.value} value={o.value}>
                {o.text}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    </div>
  );
};
