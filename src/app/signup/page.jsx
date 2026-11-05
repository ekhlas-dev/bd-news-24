"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "../../lib/auth-client";

const SignUp = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const formData = new FormData(e.currentTarget);

    const { name, email, password, confirmPassword } = Object.fromEntries(
      formData.entries(),
    );

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        setError(error.message || "Signup failed!");
        return;
      }

      router.push("/");
    } catch (err) {
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10">
      <div className="w-full max-w-md bg-base-100 p-8 rounded-2xl shadow-lg border border-base-300">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Create Account</h1>

          <p className="text-base-content/60 mt-2">
            Join us today and get started
          </p>
        </div>

        {error && (
          <div className="alert alert-error mb-5">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="label font-medium">Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label font-medium">Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label font-medium">Password</label>

            <input
              type="password"
              name="password"
              placeholder="Create a password"
              className="input input-bordered w-full"
              minLength={8}
              required
            />
          </div>

          <div>
            <label className="label font-medium">Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              className="input input-bordered w-full"
              minLength={8}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="divider">OR</div>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-primary font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
