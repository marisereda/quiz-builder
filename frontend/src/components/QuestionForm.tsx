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
import Label from './Label';

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
        <Label>
          Question:
          <textarea
            className="border p-2 rounded w-full text-gray-950 font-normal"
            placeholder="Type the question"
            {...register('text', { required: true, minLength: 5 })}
          />
          {errors.text && (
            <ErrorMessage>
              This field is required and the length should be more than 5
            </ErrorMessage>
          )}
        </Label>

        <Label>
          Choose the type of answer:
          <select
            {...register('type')}
            className="border p-2 rounded w-full text-gray-950 font-normal"
          >
            <option value={QuestionType.boolean}>True / False</option>
            <option value={QuestionType.input}>Text</option>
            <option value={QuestionType.checkbox}>Checkbox</option>
          </select>
        </Label>

        {chosenQuestionType === QuestionType.checkbox && (
          <div className="flex flex-col gap-3">
            <Label className="flex flex-col gap-3">
              Add the answers and mark the correct one(s):
              {answers.map((answer, index) => (
                <>
                  <div key={answer.id} className="flex  gap-3">
                    <input
                      placeholder="Type the variant of answer"
                      className="border p-2 rounded w-full text-gray-950 font-normal"
                      {...register(`answers.${index}.value`, {
                        required: true,
                      })}
                    />

                    <input
                      className="min-w-6 text-gray-950 font-normal"
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
                  {errors.answers?.[index]?.value && (
                    <ErrorMessage>The answer is required</ErrorMessage>
                  )}
                </>
              ))}
            </Label>
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
            <Label className="flex flex-col gap-4">
              Correct Answer:
              <input
                placeholder="Type the correct answer"
                className="border p-2 rounded w-full text-gray-950 font-normal"
                {...register(`answers.0.value`, { required: true })}
              />
              {errors.answers?.[0]?.value && (
                <ErrorMessage>The answer is required</ErrorMessage>
              )}
            </Label>
          </div>
        )}

        {chosenQuestionType === QuestionType.boolean && answers.length > 0 && (
          <div className="mt-2">
            <Label>Correct Answer:</Label>
            <select
              {...register(`answers.0.value`)}
              className="border p-2 rounded w-full text-gray-950 font-normal"
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
          <Button type="submit" title="Save" disabled={answers.length === 0} />
        </div>
      </form>
    </div>
  );
}
