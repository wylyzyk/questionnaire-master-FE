import * as React from "react";
import { IQuestionnaireInputProps } from "./type.ts";
import { Form, Input } from "antd";
import { useEffect } from "react";

export const InputPropPanel: React.FC<Partial<IQuestionnaireInputProps>> = ({
  title,
  placeholder,
  onChange,
  disabled
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ title, placeholder });
  }, [title, placeholder]);

  const handleChange = () => {
    onChange?.(form.getFieldsValue());
  };

  return (
    <Form
      layout="vertical"
      initialValues={{ title, placeholder }}
      form={form}
      onValuesChange={handleChange}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: "请输入标题" }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Placeholder" name="placeholder">
        <Input />
      </Form.Item>
    </Form>
  );
};
