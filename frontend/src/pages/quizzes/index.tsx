import ButtonIcon from '@/components/ButtonIcon';
import ButtonLink from '@/components/ButtonLink';
import Title from '@/components/Title';
import { IQuizz } from '@/types/types';
import { useRouter } from 'next/router';
import { MdDelete } from 'react-icons/md';

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/quizzes');
  const data = await res.json();

  return {
    props: { data },
  };
}

interface IQuizzesProps {
  data: IQuizz[];
}

export default function Quizzes({ data }: IQuizzesProps) {
  const router = useRouter();
  const handleRedirectQuizzDetails = (quizz: IQuizz) => {
    router.push({
      pathname: `/quizzes/${quizz.id}`,
    });
  };

  const handleDeleteQuizz = async (quizz: IQuizz) => {
    await fetch(`http://localhost:3000/quizzes/${quizz.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    router.push('/quizzes');
  };

  return (
    <>
      <ButtonLink href="/create" title="Create a Quizz" />
      <Title>Quizzes list</Title>
      <div className="flex flex-col gap-4 items-center">
        {data.length !== 0 &&
          data.map((quizz: IQuizz, index) => (
            <div key={index} className="flex gap-4 ">
              <button
                className="border rounded-2xl border-gray-400 p-4 bg-blue-200 font-bold cursor-pointer text-bold text-2xl min-w-2xl"
                onClick={() => handleRedirectQuizzDetails(quizz)}
              >
                <div className="flex justify-between">
                  <span>{quizz.title}</span>
                  <span className="text-xl">
                    {quizz.questions.length} {'question(s)'}
                  </span>
                </div>
              </button>
              <ButtonIcon
                icon={MdDelete}
                type="button"
                className="text-red-600 "
                onClick={() => handleDeleteQuizz(quizz)}
              />
            </div>
          ))}
        {data.length === 0 && (
          <p className="mt-20 text-2xl text-blue-500 ">
            {
              "There is no any Quizz saved. Press 'Create a Quizz' button to add the Quizz."
            }
          </p>
        )}
      </div>
    </>
  );
}
