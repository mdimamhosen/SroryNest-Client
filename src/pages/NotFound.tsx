const NotFound = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
      <div className="text-center p-8 border-2 border-white rounded-lg bg-gray-900">
        <h1 className="text-9xl font-bold">404</h1>
        <p className="text-xl mt-4">
          Oops! The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="text-yellow-500 hover:underline text-lg mt-6 inline-block"
        >
          Go Back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
