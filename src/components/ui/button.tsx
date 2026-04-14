
export default function Button({text, className} : {text: string, className?: string}) {
  return (
    <button className="cursor-pointer font-semibold overflow-hidden relative z-100 border border-green-500 group px-8 py-2 rounded-full">
      <span className="relative z-10 text-green-500 group-hover:text-white text-lg duration-500">
        {text}
      </span>
      <span className="absolute w-full h-full bg-green-500 -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
      <span className="absolute w-full h-full bg-green-500 -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
    </button>
  );
}
