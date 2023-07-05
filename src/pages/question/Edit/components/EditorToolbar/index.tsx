import { Button, Space, Tooltip } from "antd";
import { CopyOutlined, DeleteOutlined, EyeInvisibleOutlined, LockOutlined, SnippetsOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  changeComponentHidden,
  copyComponent,
  pasteComponent,
  removeComponent,
  toggleComponentLocked
} from "../../../../../stores/componentsList";
import { useGetComponentInfo } from "../../../../../hooks/component.ts";

export const EditorToolbar = () => {
  const dispatch = useDispatch();
  const { selectedId, selectedComponent, copiedComponent } = useGetComponentInfo();
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

  const handleCopy = () => {
    dispatch(copyComponent());
  };

  const handlePaste = () => {
    dispatch(pasteComponent());
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
      <Tooltip title="复制">
        <Button shape="circle" icon={<CopyOutlined />} onClick={handleCopy} />
      </Tooltip>
      <Tooltip title="粘贴">
        <Button shape="circle" icon={<SnippetsOutlined />} onClick={handlePaste} disabled={!copiedComponent} />
      </Tooltip>
    </Space>
  );
};
