import { KeyRound, LayoutDashboard, User } from "lucide-react";

export const Navigation = [
  {
    name: "nav.dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    name: "nav.profile",
    href: "/profile",
    icon: <User className="h-5 w-5" />,
  },
  {
    name: "nav.sessions",
    href: "/sessions",
    icon: <KeyRound className="h-5 w-5" />,
  },
];
