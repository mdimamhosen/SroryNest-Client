import {
  useAllBooksQuery,
  useDeleteBookMutation,
} from "@/redux/features/books/bookAPI";
import { IBook } from "@/redux/features/books/bookSlice";
import { useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "sonner";

const AllBooks = () => {
  const { data, error, isLoading, refetch } = useAllBooksQuery(undefined);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const [deleteBookFromDB] = useDeleteBookMutation();

  const editBook = (id: string) => {
    console.log(`Edit book with ID: ${id}`);
  };

  const deleteBook = async (id: string) => {
    console.log(`Delete book with ID: ${id}`);

    try {
      await deleteBookFromDB(id).unwrap();
      toast.success("Book deleted successfully");
      refetch(); // Refresh data after deleting
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("Error deleting book");
    }
  };

  if (isLoading) {
    return (
      <div className="bg-[#0A111D] text-white flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div>Error loading books.</div>;
  }

  return (
    <div className="bg-[#0A111D] mt-10 px-4 md:px-8 max-h-[100vh]">
      <div className="w-full max-w-7xl mx-auto py-12">
        <h2 className="text-white text-2xl md:text-3xl font-semibold mb-6">
          All Books
        </h2>

        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto overflow-y-auto max-h-[60vh]">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-3 text-white font-semibold text-sm md:text-lg">
                  Title
                </th>
                <th className="p-3 text-white font-semibold text-sm md:text-lg">
                  Category
                </th>
                <th className="p-3 text-white font-semibold text-sm md:text-lg">
                  Author
                </th>
                <th className="p-3 text-white font-semibold text-sm md:text-lg">
                  Price
                </th>
                <th className="p-3 text-white font-semibold text-sm md:text-lg">
                  Stock
                </th>
                <th className="p-3 text-white font-semibold text-sm md:text-lg">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.data
                ?.filter((book: IBook) => !book.isDeleted)
                .map((book: IBook) => (
                  <tr
                    key={book._id}
                    className="border-b border-gray-700 hover:bg-gray-900 transition"
                  >
                    <td className="p-3 text-white text-sm md:text-base">
                      {book.title}
                    </td>
                    <td className="p-3 text-white text-sm md:text-base">
                      {book.category}
                    </td>
                    <td className="p-3 text-white text-sm md:text-base">
                      {book.author || "Unknown"}
                    </td>
                    <td className="p-3 text-white text-sm md:text-base">
                      ${book.price}
                    </td>
                    <td className="p-3 text-white text-sm md:text-base">
                      {book.stock}
                    </td>
                    <td className="p-3 text-white text-sm md:text-base flex gap-2">
                      <button
                        onClick={() => editBook(book._id)}
                        className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => deleteBook(book._id)}
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllBooks;
