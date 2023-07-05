import * as React from "react";
import { IQuestionnaireRadioProps } from "./type.ts";
import { Button, Checkbox, Form, Input, Select, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { nanoid } from "nanoid";

export const PropComponent: React.FC<IQuestionnaireRadioProps> = (props) => {
  const { title, options, value, disabled, onChange } = props;
  const [form] = Form.useForm();

  React.useEffect(() => {
    form.setFieldsValue({ title, options, value });
  }, [title, options, value]);
  const handleChange = () => {
    const newValues: IQuestionnaireRadioProps = form.getFieldsValue();
    // newValues.options = newValues.options?.filter((opt) => !!opt.text);
    const { options } = newValues;
    options?.forEach((opt) => {
      if (opt.value) return;
      opt.value = nanoid(5);
    });
    onChange?.(newValues);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, options, value }}
      disabled={disabled}
      onValuesChange={handleChange}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: "请输入标题" }]}>
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    <Form.Item
                      name={[name, "text"]}
                      rules={[
                        { required: true, message: "请输入选项" },
                        {
                          validator(_, text) {
                            const { options = [] } = form.getFieldsValue();
                            let num = 0;
                            options.forEach((o: any) => {
                              o.text === text && num++;
                            });
                            if (num === 1) return Promise.resolve();
                            return Promise.reject(new Error("不能与其他选项重复"));
                          }
                        }
                      ]}
                    >
                      <Input placeholder="请输入选项文字" />
                    </Form.Item>
                    {index > 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
                  </Space>
                );
              })}
              <Form.Item>
                <Button type="link" onClick={() => add({ text: "", value: "" })} icon={<PlusOutlined />}>
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item label="默认选中" name="value">
        <Select value={value} options={options?.map(({ text, value }) => ({ label: text || "", value }))} />
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
};
