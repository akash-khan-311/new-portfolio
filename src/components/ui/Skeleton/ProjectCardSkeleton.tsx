export default function ProjectCardSkeleton() {
  return (
    <section className="dark:bg-[#000000] bg-white p-5 rounded-lg animate-pulse flex-1">
      <div className="flex flex-col md:flex-row justify-between items-center gap-x-10">
        {/* IMAGE SKELETON */}
        <div className="w-full lg:w-2/4 md:w-3/4 md:h-96 h-64 rounded-md overflow-hidden bg-gray-300 dark:bg-slate-800" />

        {/* CONTENT */}
        <div className="w-full md:w-3/5 flex flex-col justify-center items-center md:items-start mt-5 md:mt-0">
          {/* TITLE */}
          <div className="h-10 w-3/4 rounded-md bg-gray-300 dark:bg-slate-800" />

          {/* DESCRIPTION */}
          <div className="w-full mt-5 space-y-3">
            <div className="h-4 w-full rounded bg-gray-300 dark:bg-slate-800" />
            <div className="h-4 w-11/12 rounded bg-gray-300 dark:bg-slate-800" />
            <div className="h-4 w-10/12 rounded bg-gray-300 dark:bg-slate-800" />
          </div>

          {/* TAGS */}
          <div className="flex gap-3 flex-wrap mt-6 justify-center md:justify-start">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-8 w-24 rounded-lg bg-gray-300 dark:bg-slate-800"
              />
            ))}
          </div>

          {/* BUTTONS */}
          <div className="flex gap-x-5 mt-8">
            <div className="h-11 w-32 rounded-md bg-gray-300 dark:bg-slate-800" />

            <div className="h-11 w-32 rounded-md bg-gray-300 dark:bg-slate-800" />
          </div>
        </div>
      </div>
    </section>
  );
}
