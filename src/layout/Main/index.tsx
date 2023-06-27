import * as React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import styled from "./index.module.scss";
import { Logo } from "../../components/Logo";
import { UserInfo } from "../../components/UserInfo";

export const Main: React.FC = () => {
  return (
    <Layout>
      <Layout.Header className={styled.header}>
        <div className={styled.left}>
          <Logo />
        </div>
        <div className={styled.right}>
          <UserInfo />
        </div>
      </Layout.Header>
      <Layout className={styled.main}>
        <Layout.Content>
          <Outlet />
        </Layout.Content>
      </Layout>
      <Layout.Footer className={styled.footer}>
        Questionnaire Master &copy; 2023 - present. Created by Mornstar{" "}
      </Layout.Footer>
    </Layout>
  );
};
