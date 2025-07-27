import clsx from 'clsx';
interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function Title({ children, className }: TitleProps) {
  return (
    <>
      <h1
        className={clsx(
          'flex justify-center font-bold text-4xl mb-8 ',
          className
        )}
      >
        {children}
      </h1>
    </>
  );
}
