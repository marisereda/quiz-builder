import { IAnswer, IQuestion, QuestionType } from '@/types/types';
import { useEffect } from 'react';
import {
  SubmitHandler,
  useController,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import Title from './Title';
import Button from './Button';
import ErrorMessage from './ErrorMessage';
import { MdDelete } from 'react-icons/md';
import ButtonIcon from './ButtonIcon';

const defaultValues: IQuestion = {
  text: '',
  type: QuestionType.input,
  answers: [],
};

interface IQuestionFormProps {
  onClose: () => void;
  onSave: (data: IQuestion) => void;
}

export default function QuestionForm({ onClose, onSave }: IQuestionFormProps) {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IQuestion>({ defaultValues: defaultValues });
  const onSubmit: SubmitHandler<IQuestion> = (data) => {
    onSave(data);
  };

  const {
    fields: answers,
    append,
    remove,
    replace,
  } = useFieldArray({
    control,
    name: 'answers',
  });

  const questionType = useController({ control, name: 'type' });
  const chosenQuestionType = watch(questionType.field.name);

  useEffect(() => {
    if (chosenQuestionType === QuestionType.input) {
      replace([{ value: '', isCorrect: true }]);
    } else if (chosenQuestionType === QuestionType.boolean) {
      replace([{ value: 'true', isCorrect: true }]);
    } else if (chosenQuestionType === QuestionType.checkbox) {
      replace([]);
    }
  }, [chosenQuestionType, replace]);

  return (
    <div>
      <Title>Add a Question</Title>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <label>
          Question:
          <textarea
            className="border p-2 rounded w-full"
            placeholder="Type the question"
            {...register('text', { required: true })}
          />
          {errors.text && <ErrorMessage>This field is required</ErrorMessage>}
        </label>

        <label>
          Choose the type of answer:
          <select {...register('type')} className="border p-2 rounded w-full">
            <option value={QuestionType.boolean}>True / False</option>
            <option value={QuestionType.input}>Text</option>
            <option value={QuestionType.checkbox}>Checkbox</option>
          </select>
        </label>

        {chosenQuestionType === QuestionType.checkbox && (
          <div className="flex flex-col gap-3">
            <label className="flex flex-col gap-3">
              Add the answers and mark the correct one(s):
              {answers.map((answer, index) => (
                <>
                  <div key={answer.id} className="flex gap-3">
                    <input
                      placeholder="Type the variant of answer"
                      className="border p-2 rounded w-full"
                      {...register(`answers.${index}.value`, {
                        required: true,
                      })}
                    />

                    <input
                      className="min-w-6"
                      type="checkbox"
                      {...register(`answers.${index}.isCorrect` as const)}
                    />

                    <ButtonIcon
                      icon={MdDelete}
                      type="button"
                      className="text-red-600 "
                      onClick={() => remove(index)}
                    />
                  </div>
                </>
              ))}
            </label>
            <Button
              className="m-auto"
              title="Add answer"
              type="button"
              onClick={() => append({ value: '', isCorrect: false } as IAnswer)}
            ></Button>
          </div>
        )}

        {chosenQuestionType === QuestionType.input && answers.length > 0 && (
          <div className="mt-2">
            <label className="block mb-1">Correct Answer:</label>
            <input
              placeholder="Type the correct answer"
              className="border p-2 rounded w-full"
              {...register(`answers.0.value`, { required: true })}
            />
          </div>
        )}

        {chosenQuestionType === QuestionType.boolean && answers.length > 0 && (
          <div className="mt-2">
            <label className="block mb-1">Correct Answer:</label>
            <select
              {...register(`answers.0.value`)}
              className="border p-2 rounded w-full"
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <Button
            type="button"
            title="Cancel"
            onClick={onClose}
            variant="secondary"
          />
          <Button type="submit" title="Save" />
        </div>
      </form>
    </div>
  );
}
