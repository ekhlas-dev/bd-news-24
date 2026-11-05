const Loading = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="flex flex-col items-center text-center">

        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>

        {/* Loading Text */}
        <h2 className="mt-6 text-xl font-semibold text-gray-900">
          Loading...
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Please wait while we load your content.
        </p>

      </div>
    </main>
  );
};

export default Loading;