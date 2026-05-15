import Link from "next/link";

function Button({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`cursor-pointer dark:text-white font-semibold overflow-hidden relative z-1 gradient-border hover:bg-[#b5ff6d] duration-300 transition-all group px-8 py-2 rounded-full ${className}`}
    >
      {children}
    </Link>
  );
}

export default Button;
