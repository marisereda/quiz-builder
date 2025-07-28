import ButtonLink from '@/components/ButtonLink';
import QuestionCard from '@/components/QuestionCard';
import Title from '@/components/Title';
import { IQuizz } from '@/types/types';
import { GetServerSidePropsContext } from 'next';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  const res = await fetch(`http://localhost:3000/quizzes/${query.id}`);
  const data = await res.json();

  return {
    props: { data },
  };
}

interface IQuizzProps {
  data?: IQuizz;
}

export default function Quizz({ data }: IQuizzProps) {
  return (
    <>
      <ButtonLink href="/quizzes" title="Back to Quizzes" />
      <Title>Quiz details</Title>
      <h2 className="flex justify-center font-bold text-3xl mb-8 text-blue-500">
        {data?.title}
      </h2>
      <div className="flex flex-col gap-4 ">
        {data?.questions &&
          data.questions.length > 0 &&
          data.questions.map((question, index) => (
            <QuestionCard key={index} question={question} index={index} />
          ))}
      </div>
    </>
  );
}
