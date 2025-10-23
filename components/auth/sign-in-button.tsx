'use client'

import { Button } from "../ui/button";
import { User } from "lucide-react";
import Link from "next/link";

interface SignInButtonProps{
    className?: string
}

export default function SignInButton({ className }: SignInButtonProps){
    return (
        <Button asChild className={className}>
        <Link href="/login" className="px-4 py-2 text-sm font-medium text-white hover:text-foreground transition-colors relative group">
            <User className="h-4 w-4" />
            Sign In
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-100 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"/>
        </Link>
        </Button>
    )
}