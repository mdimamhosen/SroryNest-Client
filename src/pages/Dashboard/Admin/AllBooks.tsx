import { IUSer, selectCurrentUser } from "@/redux/features/auth/authSlice";
import {
  useAllBooksQuery,
  useDeleteBookMutation,
  useUpdateBookMutation,
} from "@/redux/features/books/bookAPI";
import { IBook } from "@/redux/features/books/bookSlice";
import { useAppSelector } from "@/redux/hooks/hook";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "sonner";

const BookCategory: string[] = [
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

interface BookFormData {
  id: string;
  title: string;
  description: string;
  price: string;
  stock: string;
  category: string;
  file?: File | null;
}

const AllBooks = () => {
  const { data, error, isLoading, refetch } = useAllBooksQuery(undefined);
  const [deleteBookFromDB] = useDeleteBookMutation();
  const [openModal, setOpenModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookFormData | null>(null);

  useEffect(() => {
    const hasReloaded = sessionStorage.getItem("hasReloaded");
    if (!hasReloaded) {
      sessionStorage.setItem("hasReloaded", "true");
      refetch();
    }
  }, [refetch]);

  const editBook = (book: IBook) => {
    setSelectedBook({
      id: book.id,
      title: book.title,
      description: book.description,
      price: String(book.price),
      stock: String(book.stock),
      category: book.category,
    });
    setOpenModal(true);
  };

  const deleteBook = async (id: string) => {
    toast.info("Deleting book...");
    try {
      await deleteBookFromDB(id).unwrap();
      toast.success("Book deleted successfully");
      refetch();
    } catch (error) {
      console.log("Error deleting book", error);
      toast.error("Failed to delete book");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[80vh] text-white flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div>Error loading books.</div>;
  }

  return (
    <div className="bg-[#0A111D] mt-10 min-h-[100vh]">
      <div className="w-11/12 max-w-7xl mx-auto py-12">
        <h2 className="text-white text-3xl font-semibold mb-6">All Books</h2>
        {/* Responsive Table Container */}
        <div className="overflow-x-auto overflow-y-auto min-h-[70vh]">
          <table className="w-full text-left table-auto border-collapse">
            <thead>
              <tr>
                <th className="p-4 text-white">Title</th>
                <th className="p-4 text-white">Category</th>
                <th className="p-4 text-white">Author</th>
                <th className="p-4 text-white">Price</th>
                <th className="p-4 text-white">Stock</th>
                <th className="p-4 text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.data
                ?.filter((book: IBook) => !book.isDeleted)
                .map((book: IBook) => (
                  <tr key={book._id} className="border-b border-gray-700">
                    <td className="p-4 text-white">{book.title}</td>
                    <td className="p-4 text-white">{book.category}</td>
                    <td className="p-4 text-white">
                      {book.author || "Unknown"}
                    </td>
                    <td className="p-4 text-white">${book.price}</td>
                    <td className="p-4 text-white">{book.stock}</td>
                    <td className="p-4 text-white space-y-1">
                      <button
                        onClick={() => editBook(book)}
                        className="bg-yellow-500 text-white p-2 rounded mr-2 hover:bg-yellow-600"
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

      {openModal && selectedBook && (
        <Modal
          book={selectedBook}
          closeModal={() => setOpenModal(false)}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default AllBooks;

interface ModalProps {
  book: BookFormData;
  closeModal: () => void;
  refetch: () => void;
}

const Modal: React.FC<ModalProps> = ({ book, closeModal, refetch }) => {
  const [formData, setFormData] = useState<BookFormData>(book);
  const [file, setFile] = useState<File | null>(null);
  const user = useAppSelector(selectCurrentUser) as IUSer;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.name === "file") {
      setFile(
        (e.target as HTMLInputElement).files
          ? (e.target as HTMLInputElement).files![0]
          : null
      );
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const [updateBook] = useUpdateBookMutation(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Book:", formData);
    console.log("Updated File:", file);

    // Create a plain object to send as data
    const dataToSend = {
      title: formData.title,
      description: formData.description,
      price: Number(formData.price),
      stock: Number(formData.stock),
      category: formData.category,
      author: user?._id,
    };

    // Check if a file is provided and handle it separately
    const formDataToSend = new FormData();
    if (file) {
      formDataToSend.append("file", file);
    }
    formDataToSend.append("data", JSON.stringify(dataToSend));

    const toastId = toast.info("Updating book...");
    try {
      // You need to update your mutation query to handle FormData
      await updateBook({ id: book.id, data: formDataToSend }).unwrap();
      toast.success("Book updated successfully!", { id: toastId });
      closeModal();
      refetch();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update book", { id: toastId });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-[#1E293B] p-6 rounded-lg w-full sm:w-96 shadow-lg border border-gray-600">
        <h2 className="text-xl font-semibold text-white mb-4">Edit Book</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-2 border border-gray-500 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border border-gray-500 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full p-2 border border-gray-500 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="w-full p-2 border border-gray-500 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-500 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {BookCategory.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* File Input for Image */}
          <input
            type="file"
            name="file"
            onChange={handleChange}
            accept="image/*"
            className="w-full p-2 border border-gray-500 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold transition-all duration-300 ease-linear px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
