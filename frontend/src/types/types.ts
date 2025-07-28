export interface IQuizz {
  id?: number;
  title: string;
  questions: IQuestion[];
}

export interface IQuestion {
  text: string;
  type: QuestionType;
  answers: IAnswer[];
}

export enum QuestionType {
  boolean = 'BOOLEAN',
  input = 'INPUT',
  checkbox = 'CHECKBOX',
}

export interface IAnswer {
  value: string;
  isCorrect: boolean;
}
