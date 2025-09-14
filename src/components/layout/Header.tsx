import { ArrowRight, LogOut, Menu, Shield, Sparkles } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { LanguageToggle } from "../LanguageToggle";
import { ThemeToggle } from "../ThemeToggle";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Navigation } from "./navigation.data";

export function Header() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isHomePage = pathname === "/";

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const getInitials = () => {
    if (!user?.username) return "?";
    return user.username.charAt(0).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <SheetHeader className="mb-4">
                <SheetTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Pro React Boilerplate
                </SheetTitle>
              </SheetHeader>
              <nav className="space-y-4">
                {Navigation.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    onClick={closeMobileMenu}
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

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start px-3 py-2 text-sm font-normal h-auto"
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      {t("common.logout")}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        {t("auth.logout.title")}
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        {t("auth.logout.description")}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>
                        {t("common.cancel")}
                      </AlertDialogCancel>
                      <AlertDialogAction onClick={handleLogout}>
                        {t("common.logout")}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Branding */}
        <NavLink to="/">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Shield className="h-8 w-8 text-primary animate-pulse" />
              <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-primary" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Pro Boilerplate
            </span>
          </div>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-1">
            <LanguageToggle />
            <ThemeToggle />
          </div>

          {isAuthenticated && !isHomePage && (
            <div className="flex items-center gap-4">
              <div className="hidden md:block text-sm">
                <p className="text-muted-foreground text-xs">Logged as:</p>
                <p className="font-medium">{user?.username}</p>
              </div>

              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hidden md:flex"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="sr-only">{t("common.logout")}</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      {t("auth.logout.title")}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      {t("auth.logout.description")}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout}>
                      {t("common.logout")}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}

          {!isAuthenticated && !isAuthPage && (
            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => navigate("/login")}>
                {t("common.login")}
              </Button>
              <Button onClick={() => navigate("/register")} className="px-6">
                {t("common.register")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
