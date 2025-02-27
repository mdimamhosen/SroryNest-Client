import { useGetBookQuery } from "@/redux/features/books/bookAPI";
import { useParams, useNavigate } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, error, isLoading } = useGetBookQuery(id);

  if (isLoading) {
    return (
      <div className="text-center bg-gray-900 min-h-screen text-white py-10">
        Loading book details...
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="text-center flex min-h-screen bg-black  text-gray-200 justify-center items-center py-10">
        Failed to load book details.
      </div>
    );
  }

  const book = data.data;

  return (
    <div className="bg-[#0A111D] min-h-screen text-white">
      <div className="w-11/12 max-w-6xl mx-auto py-8">
        {/* Back Button */}
        <button
          className="mb-6 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white"
          onClick={() => navigate(-1)}
        >
          ← Back to Books
        </button>

        {/* Book Details Card */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col md:flex-row gap-6">
          {/* Book Image */}
          <div className="md:w-1/3">
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-80 object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Book Info */}
          <div className="md:w-2/3 space-y-4">
            <h1 className="text-3xl font-bold text-yellow-400">{book.title}</h1>
            <p className="text-lg text-gray-300">
              by <span className="font-semibold">{book.author}</span>
            </p>
            <p className="text-gray-400 italic">{book.category}</p>
            <p className="text-gray-300">{book.description}</p>

            <p className="text-2xl font-bold text-green-400">${book.price}</p>
            <p
              className={`text-lg ${
                book.stock > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {book.stock > 0 ? "In Stock" : "Out of Stock"}
            </p>

            {/* Buy Now Button */}
            <button
              className={`w-full md:w-auto px-6 py-3 text-lg font-semibold rounded transition-all ${
                book.stock > 0
                  ? "bg-yellow-400 hover:bg-yellow-500 transition-all duration-300 ease-linear text-black "
                  : "bg-gray-500 cursor-not-allowed"
              }`}
              disabled={book.stock === 0}
              onClick={() => navigate(`/checkout/${book._id}`)}
            >
              {book.stock > 0 ? "Buy Now" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
