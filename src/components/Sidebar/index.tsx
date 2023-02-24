import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiBars3BottomLeft, HiOutlineShoppingBag } from "react-icons/hi2";
import { RxDashboard } from "react-icons/rx";

const Sidebar = () => {
  const [openSideBar, setOpenSideBar] = useState<boolean>(false);

  return (
    <>
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="mt-2 ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
        onClick={() => setOpenSideBar((prev) => !prev)}
      >
        <span className="sr-only">Open sidebar</span>
        <HiBars3BottomLeft size={30} />
      </button>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 h-screen w-64 ${
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
                <RxDashboard
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
                <HiOutlineShoppingBag
                  size={20}
                  className="flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900"
                />
                <span className="ml-3 flex-1 whitespace-nowrap">Products</span>
              </NavLink>
            </li>
          </ul>
          <ul className="mt-4 space-y-2 border-t border-gray-200 pt-4 dark:border-gray-700">
            <li>
              <NavLink
                to="#"
                className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-300"
              >
                <svg
                  aria-hidden="true"
                  className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-3 flex-1 whitespace-nowrap">Sign Out</span>
              </NavLink>
            </li>
            {/* <li>
              <a
                to="#"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Sign Up</span>
              </a>
            </li> */}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
