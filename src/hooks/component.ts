import { useSelector } from "react-redux";
import { IStoreState } from "../stores";
import { IComponentState } from "../stores/componentsList";

export function useGetComponentInfo() {
  const components = useSelector<IStoreState>((state) => state.components);
  const { componentList = [], selectedId = "", copiedComponent } = components as IComponentState;

  const selectedComponent = componentList.find((item) => item.fe_id === selectedId);
  return { componentList, selectedId, selectedComponent, copiedComponent };
}
