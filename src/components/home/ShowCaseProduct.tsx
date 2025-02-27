import { Link } from "react-router-dom";
import { IBook } from "@/redux/features/books/bookSlice";
import { useAllBooksQuery } from "@/redux/features/books/bookAPI";

const FeaturedProducts = () => {
  const { data, isLoading, isError } = useAllBooksQuery(undefined);

  if (isLoading)
    return <div className="text-center py-6">Loading featured products...</div>;
  if (isError)
    return (
      <div className="text-center py-6 text-red-500">
        Failed to load products
      </div>
    );

  return (
    <div className="w-11/12 max-w-maxContent mx-auto py-12">
      <h2 className="text-2xl lg:text-5xl text-center mb-4 font-bold text-gray-100">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-4">
        {data?.data?.data.slice(0, 6).map((product: IBook) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-md">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-sm font-semibold mt-2">
              Book Name: {product.title}
            </h3>
            <div className="flex justify-between items-center gap-2 mt-2">
              <p className="text-gray-300">Price: ${product.price}</p>
              <p className="text-gray-300">Category: {product.category}</p>
            </div>
            <div className="flex justify-between items-center gap-2 mt-2">
              <p>Author : {product.author}</p>
              <Link
                to={`/books/${product._id}`}
                className="p-1 bg-yellow-400 text-gray-900 text-sm font-semibold rounded-sm  "
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center my-5">
        <Link
          to="/books"
          className="mt-4 px-4 py-2 bg-yellow-400 text-black font-bold  rounded-sm hover:bg-yellow-500 transition-all duration-300 ease-linear"
        >
          View All
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProducts;
