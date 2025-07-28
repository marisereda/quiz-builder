import Button from '@/components/Button';
import ButtonLink from '@/components/ButtonLink';
import ErrorMessage from '@/components/ErrorMessage';
import Label from '@/components/Label';
import Modal from '@/components/Modal';
import QuestionCard from '@/components/QuestionCard';
import QuestionForm from '@/components/QuestionForm';
import Title from '@/components/Title';
import { IQuestion } from '@/types/types';
import { useRouter } from 'next/router';

import { useState } from 'react';

interface IQuizzState {
  title: string;
  questions: IQuestion[];
}

const initState: IQuizzState = {
  title: '',
  questions: [],
};

export default function CreateQuizz() {
  const [quizzState, setQuizzState] = useState<IQuizzState>(initState);
  const [isQuestionFormOpen, setIsQuestionFormOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleAddQuestion = () => {
    setIsQuestionFormOpen(true);
  };

  const handleSaveQuizz = async () => {
    if (!quizzState.title) {
      setErrorMessage('Please enter a title for the quizz.');
      return;
    }

    if (quizzState.questions.length === 0) {
      setErrorMessage('Please add at least one question to the quizz.');
      return;
    }
    await fetch('http://localhost:3000/quizzes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quizzState),
    });
    router.push('/quizzes');
  };

  const handleSaveQuestion = (data: IQuestion) => {
    setQuizzState((prevState) => ({
      ...prevState,
      questions: [...prevState.questions, data],
    }));
    setErrorMessage(null);
    setIsQuestionFormOpen(false);
  };

  const handleDeleteQuestion = (index: number) => {
    setQuizzState((prevState) => ({
      ...prevState,
      questions: prevState.questions.filter((_, i) => i !== index),
    }));
  };

  const handleCancelQuizz = () => {
    setQuizzState(initState);
  };
  return (
    <>
      <ButtonLink href="/quizzes" title="Back to Quizzes" />
      <Title>Create Quiz</Title>
      <div className="flex flex-col gap-4">
        <Label>
          Quiz title
          <input
            className="border p-2 rounded w-full text-gray-950 font-normal"
            type="text"
            value={quizzState.title}
            onChange={(e) => {
              setQuizzState({ ...quizzState, title: e.target.value });
              setErrorMessage(null);
            }}
            placeholder="Type Quiz Title"
          />
        </Label>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        {quizzState.questions.length > 0 &&
          quizzState.questions.map((question, index) => (
            <QuestionCard
              key={index}
              question={question}
              index={index}
              editMode={true}
              onDelete={() => handleDeleteQuestion(index)}
            />
          ))}
        <div className="flex flex-col gap-20 items-center">
          <Button
            type="button"
            onClick={handleAddQuestion}
            title="Add Question"
          />
          <div className="flex gap-4">
            <Button
              type="button"
              onClick={handleCancelQuizz}
              title="Cancel"
              variant="secondary"
              disabled={quizzState.questions.length === 0 && !quizzState.title}
            />
            <Button
              type="button"
              onClick={handleSaveQuizz}
              title="Save Quiz"
              disabled={quizzState.questions.length === 0 || !quizzState.title}
            />
          </div>
        </div>
      </div>
      {isQuestionFormOpen && (
        <Modal onClose={() => setIsQuestionFormOpen(false)}>
          <QuestionForm
            onClose={() => setIsQuestionFormOpen(false)}
            onSave={handleSaveQuestion}
          />
        </Modal>
      )}
    </>
  );
}
