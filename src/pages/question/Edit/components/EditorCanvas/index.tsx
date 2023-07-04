import * as React from "react";
import styled from "./index.module.scss";
import { Spin } from "antd";
import { useGetComponentInfo } from "../../../../../hooks/component.ts";
import { IComponentInfo, setSelectedId } from "../../../../../stores/componentsList";
import { getComponentConfByType } from "../../../../../design";
import { useDispatch } from "react-redux";

interface IProps {
  loading: boolean;
}

function getComponent({ type, props }: IComponentInfo) {
  const componentConf = getComponentConfByType(type) || null;
  if (componentConf === null) return null;
  const { Component } = componentConf;
  return <Component {...props} />;
}

export const EditorCanvas: React.FC<IProps> = ({ loading }) => {
  const { componentList, selectedId } = useGetComponentInfo();
  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>, id: string) => {
    event.stopPropagation();
    dispatch(setSelectedId(id));
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <Spin />
      </div>
    );
  }
  return (
    <div className={styled["canvas"]}>
      {componentList
        .filter((c) => !c.isHidden)
        .map((c) => {
          const { fe_id, isLocked } = c;
          return (
            <div
              key={fe_id}
              className={[
                styled[`component-wrapper`],
                fe_id === selectedId ? styled["selected"] : "",
                isLocked && styled["locked"]
              ].join(" ")}
              onClick={(event) => handleClick(event, fe_id)}
            >
              <div className={styled["disabled-behavior"]}>{getComponent(c)}</div>
            </div>
          );
        })}
    </div>
  );
};
