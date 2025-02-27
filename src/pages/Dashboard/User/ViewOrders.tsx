import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetOrdersByMailQuery } from "@/redux/features/order/OrderAPI";
import { IOrder } from "@/redux/features/order/OrderSlice";
import { useAppSelector } from "@/redux/hooks/hook";

const ViewOrders = () => {
  const user = useAppSelector(selectCurrentUser);
  const { data, isLoading, error } = useGetOrdersByMailQuery(user?._id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        <p>Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-400 bg-black">
        <p>Failed to load orders. Please try again later.</p>
      </div>
    );
  }

  const orders = data?.data || [];

  if (orders.length === 0) {
    return (
      <div className="flex text-2xl font-bold justify-center items-center min-h-screen text-gray-400  ">
        <p>No orders found.</p>
      </div>
    );
  }

  return (
    <div className="  min-h-screen p-4 max-h-[100vh]]">
      <h1 className="text-3xl font-bold text-center text-white mb-6">
        Your Orders
      </h1>

      <div className="overflow-x-auto overflow-y-auto max-h-[60vh]">
        <table className=" w-[70%] px-2 mx-auto bg-gray-950 text-white rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Quantity</th>
              <th className="p-3 text-left">Total Price</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Transaction</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: IOrder) => (
              <tr key={order.id} className="border-b border-gray-700">
                <td className="p-3">{order.id}</td>
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={order.product.image}
                    alt={order.product.title}
                    className="w-12 h-12 rounded"
                  />
                  <span>{order.product.title}</span>
                </td>
                <td className="p-3">{order.quantity}</td>
                <td className="p-3">${order.totalPrice}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status || "Pending"}
                  </span>
                </td>
                <td className="p-3">{order.transaction?.sp_code || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Helper function to style status badges
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "paid":
      return "bg-green-500 text-black";
    case "shipped":
      return "bg-blue-500 text-white";
    case "delivered":
      return "bg-purple-500 text-white";
    case "cancelled":
      return "bg-red-500 text-white";
    default:
      return "bg-yellow-500 text-black";
  }
};

export default ViewOrders;
