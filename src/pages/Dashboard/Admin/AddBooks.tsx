import { ChangeEvent, FormEvent, useState } from "react";
import { useAddBookMutation } from "@/redux/features/books/bookAPI";
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

interface BookFormData {
  title: string;
  description: string;
  price: string;
  stock: string;
  category: string;
  author: string;
  file: File | null;
}

const AddBooks = () => {
  const [addBook, { isLoading }] = useAddBookMutation();
  const [bookData, setBookData] = useState<BookFormData>({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "Fiction",
    author: "",
    file: null,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBookData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setBookData((prev) => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!bookData.file) return;

    const formData = new FormData();
    formData.append("file", bookData.file);
    formData.append(
      "data",
      JSON.stringify({
        title: bookData.title,
        description: bookData.description,
        price: Number(bookData.price),
        stock: Number(bookData.stock),
        category: bookData.category,
        author: bookData.author,
      })
    );
    const toastId = toast.info("Adding book...");
    try {
      console.log("formData", Object.fromEntries(formData));
      console.log("bookData", bookData);
      addBook(formData).unwrap();
      toast.success("Book added successfully", { id: toastId });

      setTimeout(() => {
        window.location.reload();
      }, 2000);

      setBookData({
        title: "",
        description: "",
        price: "",
        stock: "",
        author: "",
        category: "Fiction",
        file: null,
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to add book", { id: toastId });
    }
  };

  return (
    <div className="flex items-center justify-center h-full  ">
      <div className="  mt-10   flex items-center justify-center h-full">
        <div className="w-11/12 max-w-2xl bg-gray-950 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold   mb-4">Add a New Book</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={bookData.title}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={bookData.description}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={bookData.price}
                onChange={handleChange}
                required
                className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={bookData.stock}
                onChange={handleChange}
                required
                className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <select
                name="category"
                value={bookData.category}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {BookCategory.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <select
                name="author"
                value={bookData.author}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {AuthorsName.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="file"
              onChange={handleFileChange}
              required
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded disabled:bg-gray-600"
            >
              {isLoading ? "Adding..." : "Add Book"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBooks;
