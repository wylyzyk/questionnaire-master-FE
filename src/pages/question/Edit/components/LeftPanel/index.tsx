import {AppstoreAddOutlined, BarsOutlined} from "@ant-design/icons";
import {Tabs} from "antd";
import {ComponentLib} from "../ComponentLib";

export const LeftPanel = () => {
  const tabsItems = [
    {
      key: "componentLib",
      label: (
        <span>
          <AppstoreAddOutlined />
          组件库
        </span>
      ),
      children: <ComponentLib />
    },
    {
      key: "layers",
      label: (
          <span>
          <BarsOutlined />
            图层
        </span>
      ),
      children: <div> 图层</div>
    }
  ];

  return <Tabs defaultActiveKey="componentLib" items={tabsItems} />
};
