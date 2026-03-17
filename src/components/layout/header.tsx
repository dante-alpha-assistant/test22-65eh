"use client";

import * as React from "react";
import { Menu, LayoutDashboard, Users, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavLink } from "./nav-links";

const mobileNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/contacts", label: "Contacts", icon: Users },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <>
      <header className="flex h-14 items-center border-b bg-background px-4 gap-4">
        {/* Hamburger — mobile only */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Brand name on mobile */}
        <span className="md:hidden text-sm font-semibold flex-1">CRM App</span>

        {/* Spacer for desktop */}
        <div className="hidden md:flex flex-1" />

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="User menu">
              <Avatar>
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Mobile overlay nav */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <nav className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col gap-1 border-r bg-background p-4 md:hidden">
            <p className="mb-2 px-3 text-sm font-semibold">Navigation</p>
            {mobileNavItems.map((item) => (
              <div key={item.href} onClick={() => setMobileOpen(false)}>
                <NavLink href={item.href} label={item.label} icon={item.icon} />
              </div>
            ))}
          </nav>
        </>
      )}
    </>
  );
}
