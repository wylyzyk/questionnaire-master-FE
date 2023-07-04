import { QNTitle } from "./Component.tsx";
import { IQuestionnaireTitleProps } from "./type.ts";
import { TitlePropPanel } from "./PropPanel.tsx";

export * from "./type.ts";

const defaultProps: IQuestionnaireTitleProps = {
  text: "一级标题",
  level: 1,
  isCenter: false
};

export default {
  title: "标题",
  type: "title",
  Component: QNTitle,
  PropComponent: TitlePropPanel,
  defaultProps
};
