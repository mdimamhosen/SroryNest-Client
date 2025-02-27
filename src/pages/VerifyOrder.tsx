import { useVerifyOrderQuery } from "@/redux/features/order/OrderAPI";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const VerifyOrder = () => {
  const [searchQuery] = useSearchParams();
  const orderId = searchQuery.get("order_id");

  const { data, isLoading } = useVerifyOrderQuery(orderId ?? "");
  const orderData = data?.data?.[0];
  if (orderData?.bank_status === "Success") {
    toast.success("Order Placed Successfully");
  } else if (orderData?.bank_status === "Pending") {
    toast.success("Order is in Pending");
  } else if (orderData?.bank_status === "Failed") {
    toast.success("Order is Failed");
  }
  if (isLoading) {
    return (
      <div className="flex h-screen bg-black fxt-white items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0A111D] text-gray-100 p-4">
      <div className="bg-gray-900 shadow-xl rounded-lg p-6 max-w-3xl w-full border border-gray-200">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold  ">StoryNest</h1>
            <p className="text-sm  text-gray-300">Trusted Book Haven</p>
          </div>
          <div className="text-right">
            <p className=" text-gray-300 text-sm">
              Date: {orderData?.date_time}
            </p>
            <p className=" text-gray-300 text-sm">
              Invoice No: {orderData?.invoice_no}
            </p>
          </div>
        </div>
        <div className="grid lg:grid-cols-2  gap-10">
          <div className="mb-6">
            <h2 className="text-lg font-semibold  text-gray-300 mb-2">
              Customer Details
            </h2>
            <table className="w-full border-collapse border border-gray-300">
              <tbody>
                <tr>
                  <td className="px-4 py-2 border font-semibold">
                    Customer Name
                  </td>
                  <td className="px-4 py-2 border">{orderData?.name}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border font-semibold">Email</td>
                  <td className="px-4 py-2 border">{orderData?.email}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border font-semibold">
                    Phone Number
                  </td>
                  <td className="px-4 py-2 border">{orderData?.phone_no}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border font-semibold">Address</td>
                  <td className="px-4 py-2 border">
                    {orderData?.address}, {orderData?.city}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Transaction Details Table */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold  text-gray-300 mb-2">
              Transaction Details
            </h2>
            <table className="w-full border-collapse border border-gray-300">
              <tbody>
                <tr>
                  <td className="px-4 py-2 border font-semibold">Order ID</td>
                  <td className="px-4 py-2 border">{orderData?.order_id}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border font-semibold">
                    Payment Method
                  </td>
                  <td className="px-4 py-2 border">{orderData?.method}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border font-semibold">
                    Transaction ID
                  </td>
                  <td className="px-4 py-2 border">{orderData?.bank_trx_id}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border font-semibold">
                    Amount Paid
                  </td>
                  <td className="px-4 py-2 border">${orderData?.amount}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border font-semibold">
                    Exchange Rate
                  </td>
                  <td className="px-4 py-2 border">
                    1 USD = {orderData?.usd_rate} BDT
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border font-semibold">
                    Payable Amount
                  </td>
                  <td className="px-4 py-2 border">
                    {orderData?.payable_amount} BDT
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border font-semibold">
                    Bank Status
                  </td>
                  <td className="px-4 py-2 border text-yellow-400">
                    {orderData?.bank_status}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="border-t pt-4 flex justify-between items-center">
          <p className="text-gray-500 text-sm">Thank you for your purchase?</p>
          <Link
            to="/dashboard/user/view-orders"
            className="flex mt-5 font-medium bg-yellow-400 text-black transition-all duration-300 p-2 px-6 hover:bg-yellow-600  hover:text-black rounded-md items-center cursor-pointer gap-2"
          >
            View Order History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyOrder;
