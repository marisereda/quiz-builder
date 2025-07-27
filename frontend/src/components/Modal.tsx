interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  return (
    <div
      className="flex justify-center items-center absolute z-10 inset-0 bg-gray-950/70 "
      onClick={onClose}
    >
      <div
        className="p-6 rounded-2xl min-w-2xl bg-white z-20"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
