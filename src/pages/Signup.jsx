import { useState } from "react";
import { Github, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Signup() {
    const [name, setName] = useState("");

    const handleGithubSignup = () => {
        if (!name.trim()) return;
        // In a real app, you might want to store the name in session/local storage 
        // to attach it to the user after oauth callback, or pass it as state.
        localStorage.setItem("signupName", name);
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
        window.location.href = `${API_URL}/auth/github`;
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF8F0] px-4 font-sans">
            {/* Logo */}
            <Link to="/" className="mb-8 flex items-center gap-3 group">
                <img src="/stackryze_logo1.png" alt="Stackryze Logo" className="h-12 w-auto" />
                <span className="text-2xl font-bold text-[#1A1A1A] tracking-tight">Stackryze Domains</span>
            </Link>

            {/* Signup Card */}
            <div className="w-full max-w-md bg-white border-2 border-[#E5E3DF] p-8 md:p-10 rounded-xl text-center">
                <h1 className="text-2xl font-bold text-[#1A1A1A] mb-2">Create your account</h1>
                <p className="text-[#4A4A4A] mb-8">Join the developer community</p>

                <div className="space-y-6">
                    {/* Name Input */}
                    <div className="text-left">
                        <label htmlFor="name" className="block text-sm font-bold text-[#1A1A1A] mb-2">
                            What should we call you?
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Sudheer Bhuvana"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-[#FFF8F0] border-2 border-[#E5E3DF] rounded-lg px-4 py-3 text-[#1A1A1A] font-medium focus:outline-none focus:border-[#1A1A1A] transition-colors"
                        />
                    </div>

                    {/* Signup Button */}
                    <button
                        onClick={handleGithubSignup}
                        disabled={!name.trim()}
                        className={`w-full flex items-center justify-center gap-3 bg-[#1A1A1A] text-white py-3 rounded-lg font-bold transition-all duration-200 ${!name.trim()
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:shadow-[4px_4px_0px_0px_#FFD23F] hover:-translate-y-0.5"
                            }`}
                    >
                        <Github className="w-5 h-5" />
                        Sign up with GitHub
                    </button>
                </div>

                <div className="mt-8 pt-6 border-t border-[#E5E3DF]">
                    <p className="text-sm text-[#4A4A4A]">
                        Already have an account?{" "}
                        <Link to="/login" className="font-bold text-[#1A1A1A] hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>

            <p className="mt-8 text-xs text-[#888]">
                By joining, you agree to our <Link to="/terms" className="underline hover:text-[#1A1A1A]">Terms</Link> and <Link to="/privacy" className="underline hover:text-[#1A1A1A]">Privacy Policy</Link>.
            </p>
        </div>
    );
}
