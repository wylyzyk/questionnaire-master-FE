import { useKeyPress } from "ahooks";
import { useDispatch } from "react-redux";
import {copyComponent, pasteComponent, removeComponent} from "../stores/componentsList";

function isActiveElementVaild() {
  return document.activeElement === document.body;
}

function bindKeyPress(keyFilter: Array<string>, callback: () => void) {

  if (!isActiveElementVaild()) return
  useKeyPress(keyFilter, callback);
}

export function useBindingKeyPressWithCanvas() {
  const dispatch = useDispatch();
  bindKeyPress(["backspace", "delete"], () => {
    dispatch(removeComponent())
  })
  bindKeyPress(["ctrl.c", "meta.c"], () => {
    dispatch(copyComponent())
  })
  bindKeyPress(["ctrl.v", "meta.v"], () => {
    dispatch(pasteComponent())
  })
}
