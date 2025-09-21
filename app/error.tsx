"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-weather-teal">
      <div className="text-center max-w-md mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-4">Something went wrong!</h2>
        <p className="text-white/80 mb-6">
          We encountered an unexpected error. Please try again.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors font-medium"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
