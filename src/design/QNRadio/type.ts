interface IOptions {
  text: string;
  value: string;
}

export interface IQuestionnaireRadioProps {
  title?: string;
  isVertical?: boolean;
  value?: string;
  options?: IOptions[];
  disabled?: boolean;

  onChange?: (val: IQuestionnaireRadioProps) => void;
}

export const defaultRadioProps: IQuestionnaireRadioProps = {
  title: "单选标题",
  isVertical: false,
  value: "",  // 默认选中
  options: [
    { text: "选项1", value: "item1" },
    { text: "选项2", value: "item2" },
    { text: "选项3", value: "item3" }
  ]
}
