import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Sidebar from "../Sidebar";
import type { User } from "@/redux/User/slice";

const ProtectedRoute = () => {
  const user: User = useSelector((state) => (state as any).user);
  const location = useLocation();

  if (!user?.accessToken) {
    return (
      <Navigate to="/admin/login" state={{ path: location.pathname }} replace />
    );
  }

  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
