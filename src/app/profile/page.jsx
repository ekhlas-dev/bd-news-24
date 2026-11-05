"use client";

import React, { useState } from "react";
import Image from "next/image";
import { authClient } from "../../lib/auth-client";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  if (isPending) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  if (!session) {
    return <p className="text-center mt-20">Please sign in first.</p>;
  }

  const user = session.user;

  const handleUpdate = async (e) => {
    e.preventDefault();

    const { data, error } = await authClient.updateUser({
      name,
      image,
    });

    if (error) {
      console.log(error.message);
      return;
    }

    alert("Profile updated successfully!");
  };

  return (
    <main className="min-h-screen bg-base-200 px-4 py-12">
      <div className="max-w-2xl mx-auto bg-base-100 rounded-2xl shadow-sm border border-base-300 p-6 md:p-10">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-base-content/60 mt-2">
            Manage your personal information
          </p>

          <div className="avatar mt-6">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              {user.image ? (
                <Image
                  src={user.image}
                  alt="Profile"
                  width={96}
                  height={96}
                  className="object-cover"
                />
              ) : (
                <div className="bg-primary text-primary-content flex items-center justify-center text-3xl font-bold">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
            </div>
          </div>

          <p className="font-semibold mt-4">{user.name}</p>
          <p className="text-sm text-base-content/60">
            {user.email}
          </p>
        </div>

        <div className="divider"></div>

        <form onSubmit={handleUpdate} className="space-y-5">

          <div>
            <label className="label font-semibold">
              Full Name
            </label>

            <input
              type="text"
              placeholder={user.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label font-semibold">
              Email Address
            </label>

            <input
              type="email"
              value={user.email}
              disabled
              className="input input-bordered w-full"
            />

            <p className="text-xs text-base-content/50 mt-1">
              Email address cannot be changed here.
            </p>
          </div>

          <div>
            <label className="label font-semibold">
              Profile Image URL
            </label>

            <input
              type="url"
              placeholder="Enter image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Update Profile
          </button>

        </form>
      </div>
    </main>
  );
};

export default ProfilePage;