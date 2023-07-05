import { QNRadio } from "./Component.tsx";
import { defaultRadioProps } from "./type.ts";
import { PropComponent } from "./PropComponent.tsx";

export * from "./type.ts";

export default {
  title: "单选",
  type: "radio",
  Component: QNRadio,
  PropComponent,
  defaultProps: defaultRadioProps
};
