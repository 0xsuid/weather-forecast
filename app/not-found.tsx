import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-weather-teal">
      <div className="text-center max-w-md mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-white/80 mb-6">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors font-medium inline-block"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
