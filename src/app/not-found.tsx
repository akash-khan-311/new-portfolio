
import Link from "next/link";

export default function NotFound() {
    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0b0b0b] px-6 text-white">
            {/* Background glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[120px]" />

            <div className="relative z-10 text-center">
                {/* 404 */}
                <h1 className="text-[120px] font-black leading-none tracking-[-0.08em] text-white sm:text-[160px]">
                    404
                </h1>

                <div className="mx-auto mt-2 h-px w-20 bg-purple-500" />

                <h2 className="mt-6 text-2xl font-semibold sm:text-3xl">
                    Page Not Found
                </h2>

                <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/50 sm:text-base">
                    The page you are looking for doesn&apos;t exist or may have been
                    moved to another location.
                </p>

                <Link
                    href="/"
                    className="mt-8 inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-300 hover:scale-105 hover:bg-purple-500 hover:text-white"
                >
                    Back to Home
                </Link>
            </div>
        </main>
    );
}

