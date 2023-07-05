import * as React from "react";
import QNInputConf, { IQuestionnaireInputProps } from "./QNInput";
import QNTitleConf, { IQuestionnaireTitleProps } from "./QNTitle";
import QNParagraphConf, { IQuestionnaireParagraphProps } from "./QNParagraph";
import QNRadioConf, { IQuestionnaireRadioProps } from "./QNRadio";

/**
 * 各个组件的 prop type
 */
export type TComponentInfoType = Partial<
  IQuestionnaireInputProps & IQuestionnaireTitleProps & IQuestionnaireParagraphProps & IQuestionnaireRadioProps
>;

/**
 * 组件统一配置
 */
export interface IComponentConf {
  title: string;
  type: string;
  Component: React.FC<TComponentInfoType>;
  PropComponent: React.FC<TComponentInfoType>;
  defaultProps: TComponentInfoType;
}

/**
 * 全部组件的配置列表
 */
const componentConfList: IComponentConf[] = [QNInputConf, QNTitleConf, QNParagraphConf, QNRadioConf];

/**
 * 组件分组
 */
export const componentGroups = [
  { groupId: "textGroup", groupName: "文本显示", components: [QNTitleConf, QNParagraphConf] },
  { groupId: "inputGroup", groupName: "用户输入", components: [QNInputConf] },
  { groupId: "chooseGroup", groupName: "用户选择", components: [QNRadioConf] }
];

/**
 * 根据类型获取组件配置
 * @param type  组件类型
 */
export function getComponentConfByType(type: string) {
  return componentConfList.find((c) => c.type === type);
}
