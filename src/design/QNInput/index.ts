import { QNInput } from "./Component.tsx";
import { IQuestionnaireInputProps } from "./type.ts";
import { InputPropPanel } from "./PropPanel.tsx";

export * from "./type.ts";

const defaultProps: IQuestionnaireInputProps = {
  title: "标题",
  placeholder: "输入提示"
};

export default {
  title: "输入框",
  type: "input",
  Component: QNInput,
  PropComponent: InputPropPanel,
  defaultProps
};
