import {
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
} from "@/redux/features/order/OrderAPI";
import { IOrder } from "@/redux/features/order/OrderSlice";
import { toast } from "sonner";

const ManageOrder = () => {
  const { data, isLoading, isError, refetch } = useGetAllOrdersQuery(undefined);
  const [updateOrder] = useUpdateOrderMutation();
  console.log(data?.data);

  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        Loading...
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500">
        Error loading orders
      </div>
    );

  interface IHandleStatusChange {
    (id: string, newStatus: string): Promise<void>;
  }

  const handleStatusChange: IHandleStatusChange = async (id, newStatus) => {
    try {
      await updateOrder({ id, data: { status: newStatus } });
      toast.success("Order status updated successfully");
      refetch();
    } catch (error) {
      toast.error("Error updating order status");
      console.log(error);
    }
  };

  return (
    <div className="mt-10 px-4 md:px-8 max-h-[100vh]">
      <h1 className=" font-bold text-gray-200 text-4xl ">View All Orders</h1>
      <div className="overflow-x-auto mt-6 overflow-y-auto max-h-[60vh]">
        <table className="min-w-full bg-black border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-2 px-4 border">Order ID</th>
              <th className="py-2 px-4 border">Customer</th>
              <th className="py-2 px-4 border">Product</th>
              <th className="py-2 px-4 border">Quantity</th>
              <th className="py-2 px-4 border">Total Price</th>
              <th className="py-2 px-4 border">Payment</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((order: IOrder) => (
              <tr key={order.id} className="border text-center">
                <td className="py-2 px-4 border">{order.id}</td>
                <td className="py-2 px-4 border">{order.user.name}</td>
                <td className="py-2 px-4 border">{order?.product?.title}</td>
                <td className="py-2 px-4 border">{order.quantity}</td>
                <td className="py-2 px-4 border">${order.totalPrice}</td>
                <td className="py-2 px-4 border">{order.paymentMethod}</td>
                <td className="py-2 px-4 border capitalize">{order.status}</td>
                <td className="py-2 px-4 border">
                  <select
                    className="p-1 border rounded bg-slate-900"
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="failed">Failed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrder;
