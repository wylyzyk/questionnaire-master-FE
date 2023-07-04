import { configureStore } from "@reduxjs/toolkit";
import componentReducer, { IComponentState } from "./componentsList";

export interface IStoreState {
  components: IComponentState;
}

const store = configureStore({
  reducer: {
    components: componentReducer
  }
});

export default store;
