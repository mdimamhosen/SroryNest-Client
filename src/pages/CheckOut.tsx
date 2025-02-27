import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetBookQuery } from "@/redux/features/books/bookAPI";
import { useCreateOrderMutation } from "@/redux/features/order/OrderAPI";
import { useAppSelector } from "@/redux/hooks/hook";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const CheckOut = () => {
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const user = useAppSelector(selectCurrentUser);
  const { id } = useParams<{ id: string }>();

  const { data, error, isLoading } = useGetBookQuery(id);
  const [createOrder, { isLoading: isCreating }] = useCreateOrderMutation();

  // ✅ Handle loading state
  if (isLoading) {
    return (
      <div className="text-white min-h-screen bg-gray-900 text-center text-xl mt-10">
        Loading book details...
      </div>
    );
  }

  // ✅ Handle error state
  if (error || !data?.data) {
    return (
      <div className="text-red-500 text-center text-xl mt-10">
        Error loading book details.
      </div>
    );
  }

  const book = data.data;
  const stock = book.stock;
  const pricePerItem = book.price;
  const totalPrice = quantity * pricePerItem;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0 && value <= stock) {
      setQuantity(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Ensure required fields are filled
    if (!name || !email || !address) {
      alert("Please fill all the required fields.");
      return;
    }

    const order = {
      product: id,
      user: user?._id,
      quantity,
      totalPrice,
      paymentMethod: "SurjoPay",
      status: "pending",
      name,
      email,
      address,
    };

    try {
      const response = await createOrder(order).unwrap();
      console.log("Order Response:", response);

      toast.success("Proced to payment...");
      // refetch();
      // navigate("/dashboard/orders");
      console.log("response", response.data);
      window.location.href = response.data;
    } catch (err) {
      console.error("Order creation failed", err);
      toast.error("Order creation failed");
    }
  };

  return (
    <div className="bg-[#0A111D] min-h-screen text-white flex justify-center items-center p-6">
      <div className="w-full max-w-2xl bg-gray-900 p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Details */}
          <div>
            <label className="block text-gray-400">Product Name:</label>
            <p className="font-semibold text-lg">{book.title}</p>
          </div>
          <div>
            <label className="block text-gray-400">Price Per Item:</label>
            <p className="font-semibold text-lg">${pricePerItem}</p>
          </div>

          {/* Quantity Selection */}
          <div>
            <label className="block text-gray-400">Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              className="border p-2 w-full rounded bg-gray-800 text-white"
              min="1"
              max={stock}
            />
            <p className="text-sm text-gray-500">Available Stock: {stock}</p>
          </div>

          {/* Total Price */}
          <div>
            <label className="block text-gray-400">Total Price:</label>
            <p className="font-semibold text-lg">${totalPrice}</p>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-gray-400">Payment Method:</label>
            <select className="border p-2 w-full rounded bg-gray-800 text-white">
              <option value="SurjoPay">SurjoPay</option>
            </select>
          </div>

          {/* User Details */}
          <div>
            <label className="block text-gray-400">Your Name:</label>
            <input
              type="text"
              className="border p-2 w-full rounded bg-gray-800 text-white"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-400">Email Address:</label>
            <input
              type="email"
              className="border p-2 w-full rounded bg-gray-800 text-white"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-400">Shipping Address:</label>
            <textarea
              className="border p-2 w-full rounded bg-gray-800 text-white"
              placeholder="Enter your shipping address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-black font-semibold py-3 rounded-md hover:bg-yellow-600 transition"
            disabled={isCreating}
          >
            {isCreating ? "Processing..." : "Proceed to Payment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckOut;
