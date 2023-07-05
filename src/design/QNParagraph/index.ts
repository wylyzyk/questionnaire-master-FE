import { QNParagraph } from "./Component.tsx";
import { IQuestionnaireParagraphProps } from "./type.ts";
import { PropComponent } from "./PropComponent.tsx";

export * from "./type.ts";

const defaultProps: IQuestionnaireParagraphProps = {
  text: "一个段落",
  isCenter: false
};

export default {
  title: "段落",
  type: "paragraph",
  Component: QNParagraph,
  PropComponent,
  defaultProps
};
