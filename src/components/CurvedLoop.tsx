
type Props = {
  items: string[]
}
const CurvedLoop = ({ items = [] } : Props) => {
  // Duplicate items to create seamless loop
  const repeated = [...items, ...items, ...items];

  return (
    <div className="w-full border-y dark:border-[#2a2a2a] border-[#cbd5e1] py-4 overflow-hidden relative">
      {/* Left fade */}
      <div className="absolute left-0 top-0 h-full w-52 z-10 pointer-events-none bg-linear-to-r from-white dark:from-[#111111] to-transparent" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 h-full w-52 z-10 pointer-events-none bg-linear-to-l from-white dark:from-[#111111] to-transparent" />
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 150s linear infinite;
        }

      `}</style>

      <div className="marquee-track">
        {repeated.map((item, index) => (
          <span
            key={index}
            className="flex items-center gap-4 px-2 text-[#cbd5e1] dark:text-[#3a3a3a] text-4xl  tracking-widest uppercase whitespace-nowrap select-none"
          >
            {item}
            <span className="dark:text-[#3a3a3a] ">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default CurvedLoop;