import { IQuestion } from '@/types/types';
import clsx from 'clsx';
import ButtonIcon from './ButtonIcon';
import { MdDelete } from 'react-icons/md';

interface QuestionCardProps {
  question: IQuestion;
  index: number;
  editMode?: boolean;
  onDelete?: (index: number) => void;
}

export default function QuestionCard({
  question,
  index,
  editMode = false,
  onDelete,
}: QuestionCardProps) {
  return (
    <div className="flex flex-col gap-4 border  text-xl border-gray-400 rounded-2xl min-w-2xs p-6 bg-gray-100 shadow">
      <div className="flex item-center justify-between">
        <div>
          <span className="font-bold">{index + 1}. Question: </span>
          <span>{question.text}</span>
        </div>
        {editMode && (
          <ButtonIcon
            icon={MdDelete}
            type="button"
            className="text-red-600 "
            onClick={() => {
              if (onDelete !== undefined) {
                onDelete(index);
              }
            }}
          />
        )}
      </div>
      <div>
        <span className="font-bold">{'Answer(s):'} </span>{' '}
        <ul className="list-disc pl-6">
          {question.answers.map((answer, index) => (
            <li
              key={index}
              className={clsx(
                'text-gray-700',
                answer.isCorrect ? 'text-green-600 font-bold' : 'text-red-600'
              )}
            >
              {answer.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
