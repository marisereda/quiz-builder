import clsx from 'clsx';

interface ButtonProps
  extends Omit<React.ComponentPropsWithoutRef<'button'>, 'className'> {
  title: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  disabled?: boolean;
}

export default function Button({
  title,
  type = 'button',
  onClick,
  variant = 'primary',
  disabled = false,
  className,
}: ButtonProps) {
  const variantStyle =
    variant === 'primary'
      ? 'bg-blue-500 border-blue-500 hover:bg-blue-700 hover:border-blue-700 text-white disabled:bg-blue-300 disabled:border-blue-300 disabled:text-gray-200'
      : 'bg-white border-gray-500 hover:border-gray-700 hover:bg-gray-100 text-black disabled:text-gray-400 disabled:bg-white';
  return (
    <button
      className={clsx(
        'border rounded-xl font-bold py-2 px-4 min-w-36 hover:cursor-pointer text-lg disabled:cursor-none',
        variantStyle,
        className
      )}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
