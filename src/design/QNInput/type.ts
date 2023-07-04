export interface IQuestionnaireInputProps {
  title: string;
  placeholder: string;
  disabled?: boolean;

  onChange?: (val: Partial<IQuestionnaireInputProps>) => void;
}
