/**
 * Sidebar Component
 * Main navigation for Mutuini Hospital Virtual Care Portal
 */

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar: React.FC<{ isOpen?: boolean }> = ({ isOpen = true }) => {
  const pathname = usePathname() || "/";

  const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: "📊" },
    { label: "Patients", href: "/patients", icon: "👥" },
    { label: "Queue", href: "/queue", icon: "📋" },
    { label: "Appointments", href: "/appointments", icon: "📅" },
    { label: "Consultations", href: "/consultations", icon: "🩺" },
    { label: "CHP Follow-up", href: "/chp", icon: "🤝" },
    { label: "Vitals", href: "/vitals", icon: "⚕️" },
    { label: "Alerts", href: "/alerts", icon: "🚨" },
    { label: "Reports", href: "/reports", icon: "📈" },
    { label: "Users", href: "/users", icon: "👤" },
    { label: "Settings", href: "/settings", icon: "⚙️" },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <aside className={`bg-white border-r border-slate-200 h-screen ${isOpen ? "w-64" : "w-20"}`}>
      <div className="flex h-full flex-col">
        <div className="px-5 py-6 border-b border-slate-100">
          <h2 className="text-xl font-semibold text-slate-900">{isOpen ? "Mutuini Hospital" : "MH"}</h2>
          {isOpen && <p className="mt-1 text-xs text-slate-500">Virtual Care Portal</p>}
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive(item.href)
                      ? "bg-slate-100 text-slate-900 font-medium"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span className="text-slate-400 group-hover:text-slate-600 text-lg">{item.icon}</span>
                  {isOpen && <span className="truncate">{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="px-4 py-4 border-t border-slate-100">
          <div className="text-xs text-slate-500">v1.0 • Phase 1</div>
        </div>
      </div>
    </aside>
  );
};
