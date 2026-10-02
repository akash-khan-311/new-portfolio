"use client";

export default function Error({
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <main className="flex min-h-screen items-center justify-center px-6 text-white">
            <div className="text-center">
                <p className="mb-2 text-sm text-purple-400">
                    Something went wrong
                </p>

                <h1 className="text-4xl font-bold">
                    Unexpected Error
                </h1>

                <p className="mt-3 text-white/60">
                    Something went wrong while loading this page.
                    Please try again.
                </p>

                <button
                    onClick={() => reset()}
                    className="mt-6 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:scale-105"
                >
                    Try Again
                </button>
            </div>
        </main>
    );
}