import { logOut, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppDispathch, useAppSelector } from "@/redux/hooks/hook";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

const AdminBasedRoute = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector(selectCurrentUser);
  const role = user?.role;
  const dispatch = useAppDispathch();
  if (role !== "admin") {
    dispatch(logOut());
    toast.error("You are not authorized to access this page");
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default AdminBasedRoute;
