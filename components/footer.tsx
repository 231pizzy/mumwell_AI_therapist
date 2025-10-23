"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-primary/10 py-6 mt-10">
      <div className="container flex flex-col items-center gap-3 px-4 md:px-6 text-center">
        <p className="text-sm text-muted-foreground">
          © {currentYear} <span className="font-medium text-foreground">MumWell.</span>. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground/70">
          Built to empower emotional well-being through intelligent support.
        </p>
      </div>
    </footer>
  );
}
