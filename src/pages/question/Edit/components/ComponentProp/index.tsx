import { useGetComponentInfo } from "../../../../../hooks/component.ts";
import {getComponentConfByType, IComponentConf, TComponentInfoType} from "../../../../../design";
import {useDispatch} from "react-redux";
import {changeComponentProps} from "../../../../../stores/componentsList";

const NoProp = () => <div style={{ textAlign: "center" }}>未选中组件</div>;
export const ComponentProp = () => {
  const { selectedComponent } = useGetComponentInfo();
  const dispatch = useDispatch();
  if (!selectedComponent) return <NoProp />;
  const { type, props, isLocked, isHidden } = selectedComponent;
  const componentConf = getComponentConfByType(type);
  if (!componentConf) return <NoProp />;

  const changeClick = (val: TComponentInfoType) => {
    if (!selectedComponent) return;
    const fe_id = selectedComponent.fe_id;
    dispatch(changeComponentProps({
      fe_id,
      newProps: val
    }))
  }

  const { PropComponent } = componentConf as IComponentConf;
  return <PropComponent {...props} onChange={changeClick} disabled={isLocked || isHidden} />;
};
