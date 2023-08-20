import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  ShoppingBag,
} from "lucide-react";
import { useDispatch } from "react-redux";

import { logout, type User } from "@/redux/User/slice";
import { AppDispatch } from "@/redux/store";

const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [openSideBar, setOpenSideBar] = useState<boolean>(false);
  const accesstoken: string = (
    JSON.parse(localStorage.getItem("bookstoreuser")!) as User
  )?.accessToken!;

  const hanldeLogout = async () => {
    await dispatch(logout());
    location.href = "/admin/login";
  };

  return (
    <>
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="ml-3 mt-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
        onClick={() => setOpenSideBar((prev) => !prev)}
      >
        <span className="sr-only">Open sidebar</span>
        <Menu size={30} />
      </button>

      <aside
        id="logo-sidebar"
        className={`fixed left-0 top-0 z-40 h-screen w-64 ${
          openSideBar ? "translate-x-0" : "-translate-x-full"
        } border-r border-gray-700 transition-transform sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto bg-gray-200 px-3 py-4">
          <a href="#" className="mb-5 flex items-center pl-2.5">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-7"
              alt="Flowbite Logo"
            />
            <div className="flex flex-col">
              <span className="whitespace-nowrap text-xl font-semibold">
                Admin Dashboard
              </span>
              <span className="whitespace-nowrap text-sm font-semibold">
                Workspace
              </span>
            </div>
          </a>
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/admin"
                className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-300"
              >
                <LayoutDashboard
                  size={20}
                  className="text-gray-500 transition duration-75 group-hover:text-gray-900"
                />
                <span className="ml-3">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/product-list"
                className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-300"
              >
                <ShoppingBag
                  size={20}
                  className="text-gray-500 transition duration-75 group-hover:text-gray-900"
                />
                <span className="ml-3 flex-1 whitespace-nowrap">Products</span>
              </NavLink>
            </li>
          </ul>
          <ul className="mt-4 space-y-2 border-t border-gray-200 pt-4 dark:border-gray-700">
            {accesstoken !== undefined ? (
              <li>
                <NavLink
                  to="#"
                  onClick={hanldeLogout}
                  className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-300"
                >
                  <LogOut
                    size={20}
                    className="text-gray-500 transition duration-75 group-hover:text-gray-900"
                  />
                  <span className="ml-3 flex-1 whitespace-nowrap">
                    Sign Out
                  </span>
                </NavLink>
              </li>
            ) : (
              <li>
                <NavLink
                  to="/admin/login"
                  className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-300"
                >
                  <LogIn
                    size={20}
                    className="text-gray-500 transition duration-75 group-hover:text-gray-900"
                  />
                  <span className="ml-3 flex-1 whitespace-nowrap">Sign In</span>
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
