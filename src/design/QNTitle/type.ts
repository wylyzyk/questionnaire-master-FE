export interface IQuestionnaireTitleProps {
  text: string;
  level: 1 | 2 | 3 | 4 | 5;
  isCenter: boolean;
  disabled?: boolean;

  onChange?: (val: Partial<IQuestionnaireTitleProps>) => void;
}
