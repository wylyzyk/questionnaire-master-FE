import { IComponentInfo } from "./index.ts";

export function getNextSelectedId(selectedId: string, componentList: Array<IComponentInfo>) {
  const visibleComponentList = componentList.filter(c => !c.isHidden);
  const index = visibleComponentList.findIndex((c) => c.fe_id === selectedId);
  if (index < 0) return "";

  let newSelectedId: string;
  const length = visibleComponentList.length;
  if (length <= 1) {
    newSelectedId = "";
  } else {
    if (index + 1 === length) {
      newSelectedId = visibleComponentList[index - 1].fe_id;
    } else {
      newSelectedId = visibleComponentList[index + 1].fe_id;
    }
  }
  return newSelectedId;
}
