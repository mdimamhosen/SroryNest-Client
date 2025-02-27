import { IUser } from "@/redux/features/auth/authSlice";
import {
  useAllUsersQuery,
  useUpdateUserMutation,
} from "@/redux/features/createUser/createUser.API";
import { useEffect } from "react";
import { toast } from "sonner";

const AllUsers = () => {
  const { data, error, isLoading, refetch } = useAllUsersQuery(undefined);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const [updateUser] = useUpdateUserMutation();

  const handleStatusUpdate = async (id: string, isBlocked: string) => {
    try {
      await updateUser({ id, isBlocked: isBlocked === "true" }).unwrap();
      toast.success("User status updated successfully");
      refetch();
    } catch (error) {
      console.error("Error updating user status:", error);
      toast.error("Error updating user status");
    }
  };

  if (isLoading) {
    return (
      <div className="bg-[#0A111D] text-white flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-10">Error loading users.</div>
    );
  }

  return (
    <div className="bg-[#0A111D] mt-10 px-4 md:px-8 max-h-[100vh]">
      <div className="w-full max-w-7xl mx-auto py-12">
        <h2 className="text-white text-2xl md:text-3xl font-semibold mb-6">
          All Users
        </h2>
        <div className="overflow-x-auto overflow-y-auto max-h-[60vh]">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-3 text-white font-semibold text-sm md:text-lg">
                  Name
                </th>
                <th className="p-3 text-white font-semibold text-sm md:text-lg">
                  Email
                </th>
                <th className="p-3 text-white font-semibold text-sm md:text-lg">
                  User ID
                </th>
                <th className="p-3 text-white font-semibold text-sm md:text-lg">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((user: IUser) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-700 hover:bg-gray-900 transition"
                >
                  <td className="p-3 text-white text-sm md:text-base">
                    {user.name}
                  </td>
                  <td className="p-3 text-white text-sm md:text-base">
                    {user.email}
                  </td>
                  <td className="p-3 text-white text-sm md:text-base">
                    {user.id || "Unknown"}
                  </td>
                  <td className="p-3 text-white text-sm md:text-base">
                    <select
                      className="p-1 border rounded bg-slate-900"
                      value={user.isBlocked.toString()}
                      onChange={(e) =>
                        handleStatusUpdate(user.id, e.target.value)
                      }
                    >
                      <option value="true">Blocked</option>
                      <option value="false">Active</option>
                    </select>
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

export default AllUsers;
