import * as React from "react";
import { useEffect } from "react";
import { IQuestionnaireParagraphProps } from "./type.ts";
import { Checkbox, Form, Input } from "antd";

export const PropComponent: React.FC<IQuestionnaireParagraphProps> = (props) => {
  const { text, isCenter, disabled, onChange } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ text, isCenter });
  }, [text, isCenter]);

  const handleChange = () => {
    onChange?.(form.getFieldsValue());
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ text, isCenter }}
      disabled={disabled}
      onValuesChange={handleChange}
    >
      <Form.Item label="段落内容" name="text">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>段落居中</Checkbox>
      </Form.Item>
    </Form>
  );
};
