import {FileTextOutlined, SettingOutlined} from "@ant-design/icons";
import {Tabs} from "antd";
import {ComponentProp} from "../ComponentProp";

export const RightPanel = () => {
  const tabsItems = [
    {
      key: "prop",
      label: <span>
        <FileTextOutlined />
        属性
      </span>,
      children: <ComponentProp />
    },
    {
      key: "setting",
      label: <span>
        <SettingOutlined />
        页面设置
      </span>,
      children: <div></div>
    }
  ]

  return <Tabs defaultActiveKey="prop" items={tabsItems} />
}
