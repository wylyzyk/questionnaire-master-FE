import { Button, Checkbox, Form, Input, Typography } from "antd";
import { useTitle } from "ahooks";
import { Link } from "react-router-dom";
import styled from "./index.module.scss";

export const Register = () => {
  useTitle("Register - Questionnaire Master");
  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <div className={styled.container}>
      <div className={styled["form-container"]}>
        <Typography.Title className={styled.title} level={3}>
          注册新用户
        </Typography.Title>
        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} onFinish={onFinish}>
          <Form.Item label="用户名" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="密&#12288;码" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item name="disabled" valuePropName="checked" wrapperCol={{ offset: 3, span: 19 }}>
            <Checkbox>
              <Typography.Text>
                我同意问卷星 <Typography.Link>《用户服务协议》</Typography.Link>和
                <Typography.Link>《隐私条款》</Typography.Link>
              </Typography.Text>
            </Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 2, span: 19 }}>
            <Button type="primary" htmlType="submit" className={styled["button"]}>
              立即注册
            </Button>
          </Form.Item>
        </Form>
        <Typography.Paragraph className={styled["pag"]}>
          已有帐号? <Link to="/login">立即登录</Link>
        </Typography.Paragraph>
      </div>
    </div>
  );
};
