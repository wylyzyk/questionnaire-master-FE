export interface IQuestionnaireParagraphProps {
  text?: string;
  isCenter?: boolean;
  disabled?: boolean;

  onChange?: (val: IQuestionnaireParagraphProps) => void;
}
