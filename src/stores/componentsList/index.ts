import { TComponentInfoType } from "../../design";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";
import { getNextSelectedId } from "./utils.ts";

export interface IComponentInfo {
  fe_id: string;
  type: string;
  title: string;
  isHidden: boolean;
  isLocked: boolean;
  props: TComponentInfoType;
}

export interface IComponentState {
  selectedId: string;
  componentList: Array<IComponentInfo>;
}

const initialState: IComponentState = {
  selectedId: "",
  componentList: []
};

export const componentSlice = createSlice({
  name: "components",
  initialState,
  reducers: {
    // 重置所有组件
    resetComponents: (state: IComponentState, action: PayloadAction<IComponentState>) => {
      console.log(state);
      return action.payload;
    },
    // 修改 selectedId
    setSelectedId: (state: IComponentState, action: PayloadAction<string>) => {
      return {
        ...state,
        selectedId: action.payload
      };
    },
    // 添加新组件
    addComponent: (state: IComponentState, action: PayloadAction<IComponentInfo>) => {
      const { selectedId, componentList } = state;
      const index = componentList.findIndex((c) => c.fe_id === selectedId);
      if (index < 0) {
        return {
          ...state,
          selectedId: action.payload.fe_id,
          componentList: [action.payload]
        };
      } else {
        return {
          ...state,
          selectedId: action.payload.fe_id,
          componentList: [...componentList.slice(0, index + 1), action.payload, ...componentList.slice(index + 1)]
        };
      }
    },
    // 修改组件属性
    changeComponentProps: (
      state: IComponentState,
      action: PayloadAction<{
        fe_id: string;
        newProps: TComponentInfoType;
      }>
    ) => {
      const { fe_id, newProps } = action.payload;

      const customComponent = state.componentList.find((c) => c.fe_id === fe_id);
      if (customComponent) {
        return {
          ...state,
          componentList: state.componentList.map((c) => {
            if (c.fe_id === fe_id) {
              return {
                ...c,
                props: newProps
              };
            }
            return c;
          })
        };
      }
    },
    // 删除选中的组件
    removeComponent: (state: IComponentState) => {
      const { componentList, selectedId } = state;
      if (!selectedId) {
        message.warning("请在画布中选中组件进行操作");
        return;
      }
      const newSelectedId = getNextSelectedId(selectedId, componentList);
      return {
        ...state,
        selectedId: newSelectedId,
        componentList: componentList.filter((c) => c.fe_id !== selectedId)
      };
    },
    // 隐藏组件
    changeComponentHidden(state: IComponentState, action: PayloadAction<{ fe_id: string; isHidden: boolean }>) {
      const { fe_id, isHidden } = action.payload;
      let newSelectedId = "";
      if (isHidden) {
        newSelectedId = getNextSelectedId(fe_id, state.componentList);
      } else {
        newSelectedId = fe_id;
      }
      const customComponent = state.componentList.find((c) => c.fe_id === fe_id);
      if (customComponent) {
        return {
          ...state,
          selectedId: newSelectedId,
          componentList: state.componentList.map((c) => {
            if (c.fe_id === fe_id) {
              return {
                ...c,
                isHidden: isHidden
              };
            }
            return c;
          })
        };
      }
    },
    // 组件加锁/解锁
    toggleComponentLocked(state: IComponentState, action: PayloadAction<{ fe_id: string }>) {
      const { fe_id } = action.payload;
      const customComponent = state.componentList.find((c) => c.fe_id === fe_id);
      if (customComponent) {
        return {
          ...state,
          componentList: state.componentList.map((c) => {
            if (c.fe_id === fe_id) {
              return {
                ...c,
                isLocked: !c.isLocked
              };
            }
            return c;
          })
        };
      }
    }
  }
});

export const {
  resetComponents,
  setSelectedId,
  addComponent,
  changeComponentProps,
  removeComponent,
  changeComponentHidden,
  toggleComponentLocked
} = componentSlice.actions;
export default componentSlice.reducer;
