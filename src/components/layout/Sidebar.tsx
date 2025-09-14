import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Navigation } from "./navigation.data";

export function Sidebar() {
  const { t } = useTranslation();

  return (
    <div className="hidden md:flex flex-col w-64 border-r bg-background">
      <div className="p-6">
        <nav className="space-y-2">
          {Navigation.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                )
              }
            >
              {item.icon}
              {t(item.name)}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
