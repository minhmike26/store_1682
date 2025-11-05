import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaBoxOpen,
  FaClipboardList,
  FaStore,
  FaSignOutAlt,
} from "react-icons/fa";
import { toast } from "sonner";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
    toast.success("Logged out successfully");
  };
  return (
    <div className="p-6">
      <div className="mb-6">
        <Link to="/admin" className="text-2xl font-medium">
          Minh Shop
        </Link>
      </div>
      <h2 className="text-xl font-medium mb-6 text-center">Admin Dashboard</h2>
      <nav className="flex flex-col space-y-2">
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive
              ? "text-white bg-gray-700 py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaUsers size={20} />
          <span>Users</span>
        </NavLink>
        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive
              ? "text-white bg-gray-700 py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaBoxOpen size={20} />
          <span>Products</span>
        </NavLink>
        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive
              ? "text-white bg-gray-700 py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaClipboardList size={20} />
          <span>Orders</span>
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-white bg-gray-700 py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaStore size={20} />
          <span>Shop</span>
        </NavLink>
      </nav>
      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center justify-center space-x-2"
        >
          <FaSignOutAlt size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
