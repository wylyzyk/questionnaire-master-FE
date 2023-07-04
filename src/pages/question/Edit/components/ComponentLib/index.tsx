import { componentGroups, IComponentConf } from "../../../../../design";
import { Typography } from "antd";
import styled from "./index.module.scss";
import { useDispatch } from "react-redux";
import { addComponent } from "../../../../../stores/componentsList";
import { nanoid } from "nanoid";

function getComponents(c: IComponentConf) {
  const { title, type, Component, defaultProps } = c;
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(
      addComponent({
        fe_id: nanoid(),
        type,
        title,
        props: defaultProps
      })
    );
  };
  return (
    <div key={type} className={styled["wrapper"]} onClick={handleClick}>
      <div className={styled["disabled-behavior"]}>
        <Component />
      </div>
    </div>
  );
}

export const ComponentLib = () => {
  return (
    <>
      {componentGroups.map((group, index) => {
        const { groupId, groupName, components } = group;
        return (
          <div key={groupId}>
            <Typography.Title level={3} style={{ fontSize: "16px", marginTop: index > 0 ? "20px" : "0" }}>
              {groupName}
            </Typography.Title>
            <div>{components.map((c) => getComponents(c))}</div>
          </div>
        );
      })}
    </>
  );
};
