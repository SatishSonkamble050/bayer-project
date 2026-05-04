"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const menu = [
    { label: "Upload Images", path: "/upload-image" },
    { label: "List Images", path: "/list-images" },
  ];

  return (
    <div className="h-full bg-gray-900 text-white p-4">
      <h2 className="text-lg font-semibold mb-6">Dashboard</h2>

      <div className="flex flex-col gap-3">
        {menu.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`p-2 rounded ${
              pathname === item.path
                ? "bg-white text-black"
                : " hover:bg-gray-600"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;