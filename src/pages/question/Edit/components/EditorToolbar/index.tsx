import { Button, Space, Tooltip } from "antd";
import { DeleteOutlined, EyeInvisibleOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { changeComponentHidden, removeComponent, toggleComponentLocked } from "../../../../../stores/componentsList";
import { useGetComponentInfo } from "../../../../../hooks/component.ts";

export const EditorToolbar = () => {
  const dispatch = useDispatch();
  const { selectedId, selectedComponent } = useGetComponentInfo();
  const { isLocked } = selectedComponent || {};
  const handleDelete = () => {
    dispatch(removeComponent());
  };

  const handleHidden = () => {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }));
  };

  const handleLocked = () => {
    dispatch(toggleComponentLocked({ fe_id: selectedId }));
  };

  return (
    <Space>
      <Tooltip title="删除">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete} />
      </Tooltip>
      <Tooltip title="隐藏">
        <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHidden} />
      </Tooltip>
      <Tooltip title="锁定">
        <Button shape="circle" type={isLocked ? "primary" : "default"} icon={<LockOutlined />} onClick={handleLocked} />
      </Tooltip>
    </Space>
  );
};
