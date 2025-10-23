'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input"
import { registerUser } from "@/lib/api/auth";
import { Lock, Mail, User, } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react"


export default function SignUpPage() {
    const router = useRouter();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setLoading(true);
        try {
            await registerUser(name, email, password);
            router.push("/login");
        } catch (err: unknown) {
            console.log('err', err)
            setError("Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/30">
            <Container className="flex flex-col items-center justify-center w-full">
                <Card className="w-full md:w-5/12 max-w-2xl p-8 md:p-10 rounded-3xl shadow-2xl border border-primary/10 bg-card/90 backdrop-blur-lg mt-12">
                    <div className="mb-6 text-center">
                        <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-1 tracking-tight">
                            Create an Account
                        </h1>
                        <p className="text-base text-muted-foreground font-medium">
                            Begin your journey toward better mental wellness with MumWell.
                        </p>
                    </div>

                    {/* form component */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-3">

                            {/* Name and Email */}
                            <div className="flex flex-col md:flex-row gap-4">
                                {/* Name */}
                                <div className="flex-1">
                                    <label
                                        htmlFor="name"
                                        className="block text-base font-semibold mb-1"
                                    >
                                        Name
                                    </label>

                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                        <Input id="name" type="text" placeholder="Enter your Name" className="pl-12 py-2 text-base rounded-xl bg-card bg-opacity-80 border border-primary focus:outline-none focus:ring-2 focus:ring-primary text-black placeholder:text-muted-foreground" value={name} onChange={(e) => setName(e.target.value)} required />

                                    </div>
                                </div>
                                {/* Email */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-base font-semibold mb-1"
                                    >
                                        Email
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                        <Input id="email" type="email" placeholder="Enter your email" className="pl-12 py-2 text-base rounded-xl bg-card bg-opacity-80 border border-primary focus:outline-none focus:ring-2 focus:ring-primary text-black placeholder:text-muted-foreground" value={email} onChange={(e) => setEmail(e.target.value)} required />

                                    </div>
                                </div>
                            </div>


                            {/* Password and Confirm Password */}
                            {/* password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-base font-semibold mb-1"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input id="password" type="password" placeholder="Enter your password" className="pl-12 py-2 text-base rounded-xl bg-card bg-opacity-80 border border-primary focus:outline-none focus:ring-2 focus:ring-primary text-black placeholder:text-muted-foreground" value={password} onChange={(e) => setPassword(e.target.value)} required />

                                </div>
                            </div>

                            {/*confirm password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-base font-semibold mb-1"
                                >
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input id="confirmPassword" type="password" placeholder="Confirm your password" className="pl-12 py-2 text-base rounded-xl bg-card bg-opacity-80 border border-primary focus:outline-none focus:ring-2 focus:ring-primary text-black placeholder:text-muted-foreground" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

                                </div>
                            </div>
                        </div>
                        {error && (
                            <p className="text-red-500 text-base text-center font-medium">
                                {error}
                            </p>
                        )}

                        {/* button */}
                        <Button
                            className="w-full py-2 text-white rounded-xl font-bold bg-gradient-to-r from-primary to-primary/80 shadow-md hover:from-primary/80 hover:to-primary cursor-pointer"
                            size="lg"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </Button>
                    </form>

                    {/* Extra navigation links */}
                    <div className="flex items-start justify-center gap-2 text-sm">
                        <span className="text-muted-foreground">
                            Already have an account?
                        </span>
                        <Link href='/login' className="text-primary font-semibold underline">
                            Sign In
                        </Link>
                    </div>
                </Card>
            </Container>

        </div>

    )
}