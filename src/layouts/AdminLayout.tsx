import { useEffect, useState, type ReactNode } from "react";
import {
  FaBars,
  FaChevronDown,
  FaTable,
  FaThLarge,
  FaRegUser,
  FaProductHunt,
  FaRegBell,
  FaSearch,
  FaCog,
  FaRegCommentDots,
  FaRegDotCircle,
  FaUserCog,
  FaShippingFast,
  FaTags,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import type { Menu } from "../types/menu";
import type { TAny } from "../types/common";

type AdminLayoutProps = {
  children: ReactNode;
};

type MenuType = Menu[];

const menu: MenuType = [
  {
    label: "Dashboard",
    to: "",
    icon: <FaThLarge />,
    badge: 4,
  },
  {
    label: "Products",
    to: "product-list",
    icon: <FaProductHunt />,
    children: [],
  },
  {
    label: "Users",
    to: "user-list",
    icon: <FaRegUser />,
    children: [],
  },
  {
    label: "Categories",
    to: "category-list",
    icon: <FaRegUser />,
    children: [],
  },
  {
    label: "Tags",
    to: "tag-list",
    icon: <FaTags />,
    children: [],
  },
  {
    label: "Shipping",
    to: "shipping",
    icon: <FaShippingFast />,
    children: [],
  },
  {
    label: "Setting",
    to: "profile",
    icon: <FaUserCog />,
    children: [],
  },
];

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [menus, setMenus] = useState(menu);
  const location = useLocation();

  useEffect(() => {
    setMenus((prevMenus: TAny) =>
      prevMenus.map((item: Menu) => {
        return {
          ...item,
          active:
            (item.to && location.pathname.includes(item.to)) ||
            (!item.to && location.pathname === "/admin"),
        };
      })
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex bg-[#f8fafd]">
      {/* Sidebar */}
      <aside
        className={`transition-all duration-200 bg-white shadow-lg border-r border-gray-100 h-screen fixed z-30 top-0 left-0 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 px-6 py-6 border-b border-gray-100"
        >
          <img
            src="https://phpstack-1384472-5196432.cloudwaysapps.com/assets/images/logo/1.png"
            alt="Logo"
            className="h-8"
          />
        </Link>
        {/* Menu */}
        <nav className="flex-1 flex flex-col px-2 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {menus.map((item) =>
              item.isTitle ? (
                <li
                  key={item.label}
                  className="text-xs text-gray-400 uppercase font-bold mt-5 mb-2 px-4"
                >
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className={`flex items-center px-4 py-2 rounded-lg cursor-pointer group ${
                      item.active
                        ? "bg-[#f3f1fe] text-[#3d2176] font-bold"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-lg mr-3">{item.icon}</span>
                    <span
                      className={`flex-1 truncate ${
                        sidebarOpen ? "inline" : "hidden"
                      }`}
                    >
                      {item.label}
                    </span>
                    {item.badge && sidebarOpen && (
                      <span
                        className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                          typeof item.badge === "string"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-purple-100 text-purple-600"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    {item.children &&
                      item.children.length > 0 &&
                      sidebarOpen && <FaChevronDown className="ml-2 text-xs" />}
                  </Link>
                  {/* Submenu */}
                  {item.children && item.children.length > 0 && sidebarOpen && (
                    <ul className="ml-10 mt-1 space-y-1">
                      {item.children.map((sub) => (
                        <li
                          key={sub.label}
                          className={`px-3 py-1 rounded cursor-pointer text-sm ${
                            sub.active
                              ? "bg-[#ede9fe] text-[#3d2176] font-bold"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {sub.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            )}
          </ul>
        </nav>
        {/* Sidebar Toggle */}
        <button
          className="absolute top-4 right-[-18px] bg-white border border-gray-200 rounded-full shadow p-1 text-gray-500 hover:bg-gray-50 transition md:hidden"
          onClick={() => setSidebarOpen((v) => !v)}
        >
          <FaBars />
        </button>
      </aside>

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-200 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {/* Header */}
        <header className="flex items-center justify-between bg-white shadow px-6 h-16 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button
              className="text-2xl text-gray-600"
              onClick={() => setSidebarOpen((v) => !v)}
            >
              <FaBars />
            </button>
            <div className="text-gray-400 text-sm flex items-center gap-2">
              <FaTable className="text-lg" />
              <span>Table</span>
              <span className="mx-1">/</span>
              <span className="text-purple-600 font-semibold">Data Table</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <FaSearch className="text-gray-400 text-lg cursor-pointer" />
            <FaRegBell className="text-gray-400 text-lg cursor-pointer" />
            <span className="text-purple-600 font-bold flex items-center gap-1">
              <FaRegDotCircle /> 26 <span className="text-xs">℃</span>
            </span>
            <img
              src="https://flagcdn.com/us.svg"
              alt="US"
              className="w-6 h-6 rounded-full border"
            />
            <FaRegCommentDots className="text-gray-400 text-lg cursor-pointer" />
            <FaCog className="text-gray-400 text-lg cursor-pointer" />
            <Link to="profile">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="User"
                className="w-8 h-8 rounded-full border-2 border-purple-200"
              />
            </Link>
          </div>
        </header>
        {/* Content */}
        <main className="flex-1 p-6 bg-[#f8fafd]">{children}</main>
        {/* Footer */}
        <footer className="bg-white text-center py-3 text-gray-500 text-sm shadow-inner">
          Copyright © {new Date().getFullYear()} Axelit. All rights reserved
          <span className="text-pink-400 mx-1">♥</span> v1.0.0
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
