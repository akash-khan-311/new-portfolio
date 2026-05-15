export default function HeroSkeleton() {
  return (
    <div className="lg:pt-48 md:pt-32 pt-20 container mx-auto md:px-0 px-3 relative flex flex-col justify-between font-sans antialiased">
      <div className="flex flex-1 flex-col justify-center">
        {/* Badge Skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-6 w-52 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse" />
        </div>

        {/* Heading Skeleton */}
        <div className="mt-6 space-y-4 lg:w-2/3">
          <div className="h-12 md:h-14 lg:h-16 w-full bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse" />
          <div className="h-12 md:h-14 lg:h-16 w-4/5 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse" />
        </div>

        {/* Description Section Skeleton */}
        <div className="w-full py-6 lg:mt-20 md:mt-14 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            {/* Line Skeleton */}
            <div className="h-px w-full md:w-1/2 bg-gray-300 dark:bg-gray-700 animate-pulse" />

            {/* Text Skeleton */}
            <div className="w-full md:w-1/2 space-y-2">
              <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-4/6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Bottom Actions Skeleton */}
        <div className="flex justify-between items-center mt-8">
          {/* Social Icons Skeleton */}
          <div className="hidden md:flex gap-3">
            <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
            <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
            <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
          </div>

          {/* Button Skeleton */}
          <div className="h-10 w-40 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse" />
        </div>
      </div>
    </div>
  );
}
