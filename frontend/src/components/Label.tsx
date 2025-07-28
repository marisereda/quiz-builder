import clsx from 'clsx';

interface LableProps {
  children: React.ReactNode;
  className?: string;
}

export default function Label({ children, className }: LableProps) {
  return (
    <label className={clsx('mb-1 text-gray-500 text-xl font-bold', className)}>
      {children}
    </label>
  );
}
