import Link from 'next/link';

interface ButtonLinkProps {
  title: string;
  href: string;
}

export default function ButtonLink({ title, href }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className=" border border-gray-400 rounded-xl p-4 bg-green-700 text-white hover:bg-green-800 cursor-pointer text-xl font-bold min-w-24"
    >
      {title}
    </Link>
  );
}
