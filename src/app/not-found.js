
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-xl w-full text-center">

        {/* 404 Number */}
        <h1 className="text-[120px] sm:text-[180px] font-extrabold tracking-tighter text-gray-900 leading-none">
          404
        </h1>

        {/* Content */}
        <div className="mt-6 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Page Not Found
          </h2>

          <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
            Sorry, the page you are looking for doesn't exist
            or has been moved. Please check the URL or go back
            to the homepage.
          </p>
        </div>

        {/* Home Button */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-7 py-3 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-700 transition duration-200"
          >
            Back to Home
          </Link>
        </div>

        <p className="mt-10 text-sm text-gray-400">
          Error Code: 404
        </p>

      </div>
    </main>
  );
};

export default NotFound;