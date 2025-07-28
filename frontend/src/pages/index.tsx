import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/quizzes',
      permanent: false, // or true, if it's a permanent redirect
    },
  };
};

export default function Home() {
  return null;
}
