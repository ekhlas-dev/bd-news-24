"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "../lib/auth-client";

const UserInfo = () => {
  const router = useRouter();

  // Get current user session
  const { data: session, isPending } = authClient.useSession();

  // Logout with Better Auth
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signin");
          router.refresh();
        },
      },
    });
  };

  if (isPending) {
    return <span className="loading loading-spinner loading-md"></span>;
  }

  // User is not logged in
  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/signin" className="btn">
          Sign In
        </Link>

        <Link href="/signup" className="btn btn-primary">
          Sign Up
        </Link>
      </div>
    );
  }

  // Logged-in user information
  const user = session.user;

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="flex items-center gap-3 cursor-pointer"
      >
        <div className="avatar">
          <div className="w-11 rounded-full bg-base-300">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "User"}
                width={44}
                height={44}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full font-bold text-lg">
                {user.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}
          </div>
        </div>

        <div className="hidden sm:block">
          <h3 className="font-semibold text-sm">{user.name}</h3>
          <p className="text-xs text-base-content/60">{user.email}</p>
        </div>
      </div>

      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-50 mt-3 w-64 p-3 shadow-lg border border-base-300"
      >
        <li className="menu-title">My Account</li>

        <li>
          <div className="flex flex-col items-start gap-1 py-3">
            <span className="font-semibold">{user.name}</span>
            <span className="text-xs opacity-60">{user.email}</span>
          </div>
        </li>

        <div className="divider my-1"></div>

        <li>
          <Link href="/profile">My Profile</Link>
        </li>
        <li>
          <button onClick={handleSignOut} className="text-error">
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserInfo;
