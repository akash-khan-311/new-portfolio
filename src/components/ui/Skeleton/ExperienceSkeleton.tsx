export default function ExperienceSkeleton() {
  return (
    <div className="flex items-center justify-center animate-pulse flex-1">
      <div className="w-full max-w-2xl mx-auto">
        <div className="p-4">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="border-b last:border-b-0 border-gray-200 dark:border-gray-700"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-5">
                  <div className="space-y-3 w-full">
                    {/* Company / Role */}
                    <div className="h-5 w-2/3 rounded bg-gray-300 dark:bg-gray-700" />

                    {/* Date */}
                    <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-800" />
                  </div>

                  {/* Arrow */}
                  <div className="h-5 w-5 rounded-full bg-gray-300 dark:bg-gray-700" />
                </div>

                {/* Content */}
                <div className="px-5 pb-5 space-y-3">
                  <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-800" />
                  <div className="h-4 w-11/12 rounded bg-gray-200 dark:bg-gray-800" />
                  <div className="h-4 w-10/12 rounded bg-gray-200 dark:bg-gray-800" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
