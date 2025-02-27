import { useState } from "react";

import { useAllBooksForUserQuery } from "@/redux/features/books/bookAPI";
import "react-tabs/style/react-tabs.css";

import { Link } from "react-router-dom";

const BookCategory: string[] = [
  "All",
  "Fiction",
  "Non-Fiction",
  "Science",
  "History",
  "Biography",
  "Self-Help",
  "Fantasy",
  "Mystery",
  "Romance",
  "Horror",
  "Thriller",
  "Children",
  "Young Adult",
];

const AuthorsName: string[] = [
  "J.K. Rowling",
  "Stephen King",
  "Dan Brown",
  "Agatha Christie",
  "J.R.R. Tolkien",
  "George R.R. Martin",
  "Harper Lee",
  "Mark Twain",
  "Jane Austen",
  "Ernest Hemingway",
  "Leo Tolstoy",
  "F. Scott Fitzgerald",
  "Edgar Allan Poe",
  "Sylvia Plath",
  "Walt Whitman",
];

const Books = () => {
  const AuthorList = AuthorsName;
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedAuthor, setSelectedAuthor] = useState<string>("all");
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data } = useAllBooksForUserQuery({
    searchTerm,
    category: selectedCategory === "All" ? undefined : selectedCategory,
    priceRange,
    author: selectedAuthor !== "all" ? selectedAuthor : undefined,
    availability: onlyAvailable ? true : undefined,
    page: currentPage,
  });

  const productData = data?.data?.data;
  const meta = data?.data?.meta;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setPriceRange([0, value]);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-[#0A111D] min-h-screen text-white">
      <div className="w-11/12 max-w-6xl mx-auto py-5 lg:py-12">
        <h1 className="lg:text-5xl text-3xl font-bold text-center mb-4 mt-0  ">
          Explore Our Collection of Books
        </h1>
        <p className="text-center text-gray-200 mb-8">
          Discover a wide range of books across various genres, from fiction to
          self-help.
        </p>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <input
            type="text"
            className="p-2 w-full sm:w-auto rounded bg-gray-700 text-white border border-yellow-400 focus:border-yellow-500 focus:outline-none"
            placeholder="Search by Title, Author..."
            value={searchTerm}
            onChange={handleSearch}
          />

          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={handlePriceRangeChange}
              className="cursor-pointer accent-yellow-500"
            />
            <span className="text-yellow-400 font-semibold">
              Price: ${priceRange[0]} - ${priceRange[1]}
            </span>
          </div>

          <select
            className="p-2 bg-gray-700 text-white border border-yellow-400 rounded"
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
          >
            <option value="all">All Authors</option>
            {AuthorList?.map((author: string, key: number) => (
              <option key={key} value={author}>
                {author}
              </option>
            ))}
          </select>

          <select
            className="p-2 bg-gray-700 text-white border border-yellow-400 rounded"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {BookCategory.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={() => setOnlyAvailable(!onlyAvailable)}
              className="accent-yellow-500"
            />
            <span className="text-yellow-400 font-semibold">In Stock Only</span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          {productData?.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow-md bg-black bg-opacity-50"
            >
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

        {/* Pagination */}
        <div className="flex justify-between items-center mt-8">
          <p>
            Showing {(meta?.limit ?? 0) * ((meta?.page ?? 1) - 1) + 1} to{" "}
            {Math.min((meta?.limit ?? 0) * (meta?.page ?? 1), meta?.total ?? 0)}{" "}
            of {meta?.total ?? 0} products
          </p>
          <div className="flex gap-4">
            {meta && (meta.page ?? 0) > 1 && (
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-full"
                onClick={() => handlePageChange(meta.page - 1)}
              >
                Previous
              </button>
            )}
            {meta && meta.page < meta.totalPage && (
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-full"
                onClick={() => handlePageChange(meta.page + 1)}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
