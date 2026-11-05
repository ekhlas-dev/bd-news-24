
import Image from "next/image";
import { Suspense } from "react";
import NavLink from "./NavLink";
import DateDisplay from "./DateDisplay";
import UserInfo from "./UserInfo";

export default function Navbar() {
  return (
    <header className="mx-auto w-[90%] py-4">
      {/* Main Header */}
      <div className="relative flex min-h-14 items-center justify-end">
        {/* Logo and Website Name - Center */}
        <div className="absolute left-1/2 flex -translate-x-1/2 items-center">
          <Image
            src="/logo.webp"
            width={50}
            height={50}
            alt="Bangla News 24"
            className="mr-3 h-10 w-10"
            priority
          />

          <div>
            <h1 className="whitespace-nowrap font-bold">
              Bangla News 24
            </h1>

            <Suspense
              fallback={
                <p className="text-sm text-gray-500">
                  তারিখ লোড হচ্ছে...
                </p>
              }
            >
              <DateDisplay />
            </Suspense>
          </div>
        </div>

        {/* Sign In and Sign Up - Right Side */}
        <UserInfo></UserInfo>
      </div>

      {/* Category Navigation - Center */}
      <nav className="mt-4 border-t pt-4">
        <div className="flex justify-center">
          <Suspense
            fallback={
              <p className="text-sm text-gray-500">
                Categories loading...
              </p>
            }
          >
            <NavLink />
          </Suspense>
        </div>
      </nav>
    </header>
  );
}
