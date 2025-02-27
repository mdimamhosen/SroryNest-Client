import { useChangePasswordMutation } from "@/redux/features/auth/authAPI";
import React, { useState } from "react";
import { toast } from "sonner";

interface SettingsFormData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const Settings = () => {
  const [formData, setFormData] = useState<SettingsFormData>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [chagnePassword] = useChangePasswordMutation();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }
    let res;
    try {
      res = await chagnePassword(formData).unwrap();
      toast.success("Password updated successfully");
      console.log(res);
      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error("Password does not match");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen   flex items-center justify-center">
      <div className="bg-gray-950 p-8 rounded-lg w-full sm:w-96 shadow-lg">
        <h2 className="text-white text-2xl font-semibold mb-4">
          Profile Settings
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="oldPassword" className="text-white block mb-2">
              Current Password
            </label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              placeholder="Enter current password"
              className="w-full p-2 border border-gray-500 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="text-white block mb-2">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full p-2 border border-gray-500 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="text-white block mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              className="w-full p-2 border border-gray-500 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-yellow-400 hover:bg-yellow-500 transition-all duration-300 ease-linear font-bold text-black"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
