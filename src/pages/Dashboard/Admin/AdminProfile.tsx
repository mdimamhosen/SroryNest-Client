import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks/hook";
import { useGetProfileDataQuery } from "@/redux/features/createUser/createUser.API";
import OrderChart from "./OrderChart";

const AdminProfile = () => {
  const user = useAppSelector(selectCurrentUser);
  const id = user?.id;

  // Fetch profile data with type assertion
  const { data } = useGetProfileDataQuery(id);

  // Default values to avoid undefined errors
  const numberOfBooks = data?.data?.totalProducts || 0;
  const numberOfOrders = data?.data?.totalOrders || 0;
  const totalSales = data?.data?.totalSales || 0;
  const orders = data?.data?.ordersWithDate || [];

  return (
    <div>
      <div className="bg-[#0A111D]  mt-10 py-2">
        <div className="w-11/12   mx-auto  ">
          <h1 className="text-3xl font-bold text-gray-100 mb-4">
            Admin Profile
          </h1>
          <div className="border-b pb-4 mb-4">
            <p className="text-gray-200">
              Welcome to the Admin Profile page. Here you can view your details
              and manage your account.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-gray-800 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-medium text-gray-100">
                Number of Books
              </h3>
              <p className="text-3xl text-gray-300">{numberOfBooks}</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-medium text-gray-100">
                Number of Running Orders
              </h3>
              <p className="text-3xl text-gray-300">{numberOfOrders}</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-medium text-gray-100">Total Sales</h3>
              <p className="text-3xl text-gray-300">${totalSales}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Order Chart */}
      <div className=" block md:hidden lg:block ">
        <h3 className="  mt-4  text-center font-medium text-gray-100 text-2xl lg:text-4xl ">
          Orders by Month
        </h3>
        <OrderChart orders={orders} />
      </div>
    </div>
  );
};

export default AdminProfile;
