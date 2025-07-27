import clsx from 'clsx';
interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function ErrorMessage({ children, className }: TitleProps) {
  return (
    <>
      <span className={clsx('font-bold text-red-500 text-sm ', className)}>
        {children}
      </span>
    </>
  );
}
