"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {  Clock } from "lucide-react";

const menuOptions = [
  {
    id: 1,
    name: "History",
    path: "/consultation/history",
    icon: <Clock className="w-5 h-5 mr-2" />,
  },
  // {
  //   id: 2,
  //   name: "Profile",
  //   path: "/profile",
  //   icon: <User className="w-5 h-5 mr-2" />,
  // },
];

export default function AppHeader() {
  const pathname = usePathname();

  return (
    <div className="relative">
      {/* Card positioned top-right */}
      <div className="absolute top-4 right-4 bg-card border border-accent-foreground shadow-lg rounded-xl px-4 py-2 inline-flex gap-3">
        {menuOptions.map((option) => {
          const isActive = pathname === option.path;

          return (
            <Link
              key={option.id}
              href={option.path}
              className={`flex items-center px-3 py-2 font-semibold rounded-full transition-all duration-300
                ${
                  isActive
                    ? "bg-card text-foreground shadow"
                    : "bg-card text-card-foreground hover:font-bold"
                }
              `}
            >
              {option.icon}
              <span>{option.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
