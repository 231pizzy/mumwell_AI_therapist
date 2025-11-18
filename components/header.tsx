'use client';

import { LogOut, Menu, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import ThemeToggle from "./theme-toggle";
import SignInButton from "./auth/sign-in-button";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { useSession } from "@/lib/contexts/session-context";
import Image from "next/image";

export default function Header() {
  const navItems = [
    { href: "/about", label: "About MumWell" },
    { href: "/features", label: "Features" },
    { href: "/postpartum-depression", label: "Article" },
    { href: "/contact", label: "Contact" },
  ];
  const authNavItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/test", label: "Take Test" },
    { href: "/consultation", label: "Voice Consultation" },
    { href: "/contact", label: "Emergency Contact" },
  ];

  const { isAuthenticated, logout } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // console.log("Header: Auth state:", { isAuthenticated, user });

  return (
    <header className="fixed top-0 left-0 w-full z-[100] bg-[var(--nav-background)] mb-10">
      {/* Header background with subtle border and blur */}
      <div className="pointer-events-none absolute inset-0 bg-background/50 backdrop-blur-md border-b border-primary/10"></div>

      <div className="relative mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          {isAuthenticated ? (
            <Link
              href="/dashboard"
              className="flex items-center space-x-2 transition-opacity hover:opacity-80"
            >
              {/* <AudioWaveform className="h-7 w-7 text-primary animate-pulse-gentle" /> */}
              <div className="flex flex-col">
                <Image src="/mumwell.png" height={40} width={160} alt="MumWell Logo" />
              </div>
            </Link>

          ) : (
            <Link
              href="/"
              className="flex items-center space-x-2 transition-opacity hover:opacity-80"
            >
              {/* <AudioWaveform className="h-7 w-7 text-primary animate-pulse-gentle" /> */}
              <div className="flex flex-col">
                <Image src="/mumwell.png" height={40} width={160} alt="MumWell Logo" />
              </div>
            </Link>
          )}

          {/* Nav Items */}
          <div className="flex items-center gap-4 z-10">
            {isAuthenticated ? (
              <>
                <nav className="hidden md:flex items-center space-x-1">
                  {authNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                    >
                      {item.label}
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </Link>
                  ))}
                </nav>
              </>
            ) : (
              <nav className="hidden md:flex items-center space-x-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </Link>
                ))}
              </nav>
            )}


            {/* Right Actions */}
            <div className="flex items-center gap-1">
              <ThemeToggle />
              {isAuthenticated ? (
                <>
                  <Button
                    asChild
                    className=" gap-2 bg-[#6a5169] hover:bg-[#583a57]"
                  >
                    <Link href="/therapy/new">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Start Chat
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={logout}
                    className="hidden md:flex bg-gradient-to-r from-[#592830] to-[#5e1d28] hover:from-[#922c3d] hover:to-[#a1263b] text-white hover:text-white cursor-pointer transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-2 text-white" />
                    Sign out
                  </Button>
                </>
              ) : (
                <SignInButton />
              )}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
    {isMenuOpen && (
  <motion.div
    ref={menuRef}
    initial={{ opacity: 0, y: -15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.25, ease: "easeOut" }}
    className="md:hidden border-t border-primary/10 bg-background/80 backdrop-blur-xl mt-4 rounded-b-2xl shadow-xl z-50 relative"
  >
    <nav className="flex flex-col items-center space-y-3 py-6 px-4">
      {(isAuthenticated ? authNavItems : navItems).map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => setIsMenuOpen(false)}
          className="w-full text-center py-3 px-5 rounded-lg bg-gradient-to-r from-primary/10 to-primary/20 hover:from-primary/20 hover:to-primary/30 text-primary font-semibold tracking-wide shadow-sm hover:shadow-md transition-all duration-300"
        >
          {item.label}
        </Link>
      ))}

      {isAuthenticated && (
        <Button
          asChild
          onClick={logout}
          className="mt-3 w-full gap-2 bg-gradient-to-r from-[#592830] to-[#5e1d28] hover:from-[#922c3d] hover:to-[#a1263b] text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center justify-center gap-2">
            <LogOut className="w-4 h-4" />
            <span className="text-foreground">Sign out</span>
          </div>
        </Button>
      )}
    </nav>
  </motion.div>
)}


      </div>
    </header>
  );
}
