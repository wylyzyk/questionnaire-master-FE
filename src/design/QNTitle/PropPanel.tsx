import * as React from "react";
import { IQuestionnaireTitleProps } from "./type.ts";
import { Checkbox, Form, Input, Select } from "antd";
import { useEffect } from "react";

export const TitlePropPanel: React.FC<Partial<IQuestionnaireTitleProps>> = ({
  text,
  level,
  isCenter,
  onChange,
  disabled
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ text, level, isCenter });
  }, [text, level, isCenter]);

  const handleChange = () => {
    onChange?.(form.getFieldsValue());
  };

  return (
    <Form
      layout="vertical"
      initialValues={{ text, level, isCenter }}
      form={form}
      onValuesChange={handleChange}
      disabled={disabled}
    >
      <Form.Item label="标题" name="text" rules={[{ required: true, message: "请输入标题" }]}>
        <Input />
      </Form.Item>
      <Form.Item label="层级" name="level">
        <Select
          options={[
            { value: 1, text: 1 },
            { value: 2, text: 2 },
            { value: 3, text: 3 }
          ]}
        />
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  );
};
