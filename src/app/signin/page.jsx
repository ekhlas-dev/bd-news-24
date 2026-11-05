"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "../../lib/auth-client";

const SignIn = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Email and Password Sign In
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);
      const { email, password, rememberMe } = Object.fromEntries(formData);

      const { error } = await authClient.signIn.email({
        email,
        password,
        rememberMe: rememberMe === "on",
        callbackURL: "/",
      });

      if (error) {
        setError(error.message);
        return;
      }

      router.replace("/");
      router.refresh();
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Google Sign In
  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      setError("Google sign in failed. Please try again.");
      setLoading(false);
    }
  };
  // GitHub Sign In
  const handleGithubSignIn = async () => {
    setError("");
    setLoading(true);

    try {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      });
    } catch (err) {
      setError("GitHub sign in failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f6f8] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2 border border-gray-100">
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-between bg-gray-900 text-white p-12">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 bg-white text-gray-900 rounded-xl flex items-center justify-center font-bold text-2xl">
              B
            </div>

            <span className="text-xl font-bold">Bangla News 24</span>
          </Link>

          <div>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Welcome back.
              <br />
              Stay informed.
            </h1>

            <p className="text-gray-400 mt-6 leading-7">
              Sign in to explore the latest news, stories and updates from
              Bangladesh and around the world.
            </p>
          </div>

          <p className="text-gray-500 text-sm">
            © 2026 Bangla News 24. All rights reserved.
          </p>
        </div>

        {/* Right Side */}
        <div className="px-6 py-12 sm:px-12 flex flex-col justify-center">
          <div className="mb-8">
            <Link
              href="/"
              className="md:hidden text-xl font-bold text-gray-900"
            >
              Bangla News 24
            </Link>

            <p className="text-blue-600 text-sm font-semibold tracking-wider mt-5">
              WELCOME BACK
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-2">
              Sign in to your account
            </h2>

            <p className="text-gray-500 mt-2">
              Enter your details to continue.
            </p>
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 text-gray-700 font-medium hover:bg-gray-50 transition disabled:opacity-50"
          >
            <span className="font-bold text-lg">G</span>
            Continue with Google
          </button>

          {/* GitHub Button */}
          <button
            type="button"
            onClick={handleGithubSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 mt-3 text-gray-700 font-medium hover:bg-gray-50 transition disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.92.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.51 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.28-2.61 5.23-5.1 5.5.4.35.75 1.03.75 2.08V22c0 .29.2.63.76.52A11.1 11.1 0 0 0 12 .9Z" />
            </svg>
            Continue with GitHub
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-7">
            <div className="h-px bg-gray-200 flex-1" />

            <span className="text-xs text-gray-400">
              OR CONTINUE WITH EMAIL
            </span>

            <div className="h-px bg-gray-200 flex-1" />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg mb-5">
              {error}
            </p>
          )}

          {/* Sign In Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  name="rememberMe"
                  className="checkbox checkbox-sm checkbox-primary"
                />
                Remember me
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-semibold hover:bg-gray-700 transition disabled:opacity-50"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Signup Link */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Don't have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-blue-600 font-semibold hover:underline"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
