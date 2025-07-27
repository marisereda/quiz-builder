import clsx from 'clsx';
import { IconType } from 'react-icons';
import { MdDelete } from 'react-icons/md';

interface ButtonIconProps
  extends Omit<React.ComponentPropsWithoutRef<'button'>, 'className'> {
  icon: IconType;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
}

export default function ButtonIcon({
  icon: Icon,
  type = 'button',
  onClick,
  className,
}: ButtonIconProps) {
  return (
    <button
      className={clsx(
        'hover:cursor-pointer',

        className
      )}
      type={type}
      onClick={onClick}
    >
      <Icon size={32} />
    </button>
  );
}
