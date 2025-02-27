import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetProfileDataQuery } from "@/redux/features/createUser/createUser.API";
import { useAppSelector } from "@/redux/hooks/hook";
import OrderChart from "../Admin/OrderChart";

const UserProfile = () => {
  const user = useAppSelector(selectCurrentUser);
  const id = user?.id;

  const { data } = useGetProfileDataQuery(id);
  const userData = data?.data;
  const userName = userData?.user?.name || "N/A";
  const userEmail = userData?.user?.email || "N/A";
  const totalSpent = userData?.monthlySpending?.[0]?.totalSpent || 0;
  const orders = userData?.orders || [];

  return (
    <div className="  w-full   py-10">
      <div className="w-11/12 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-3">
          User Profile
        </h1>
        <p className="text-center text-gray-300 mb-3">
          Welcome to your profile page. Here you can view your details and
          spending.
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
          <div className="p-3 bg-gray-800 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-medium text-gray-100 mb-2">Name</h3>
            <p className="text-sm text-gray-300">{userName}</p>
          </div>

          <div className="p-3 bg-gray-800 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-medium text-gray-100 mb-2">Email</h3>
            <p className="text-sm text-gray-300">{userEmail}</p>
          </div>

          <div className="p-3 bg-gray-800 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-medium text-gray-100 mb-2">
              Total Spending
            </h3>
            <p className="text-sm text-gray-300">${totalSpent}</p>
          </div>
        </div>

        {/* Monthly Spending Chart */}
        <div className="bg-gray-900 p-4 rounded-lg shadow-md block md:hidden lg:block">
          <h3 className="text-xl font-medium text-white mb-2 text-center">
            Monthly Spending
          </h3>
          <OrderChart orders={orders} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
