import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "./Button";

export const DesktopNavbar = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="navbar  bg-secondary text-white shadow ">
      <div className="flex-1">
        <Link href="/" className="btn-ghost btn gap-2 text-xl normal-case">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path d="M6 3a3 3 0 00-3 3v2.25a3 3 0 003 3h2.25a3 3 0 003-3V6a3 3 0 00-3-3H6zM15.75 3a3 3 0 00-3 3v2.25a3 3 0 003 3H18a3 3 0 003-3V6a3 3 0 00-3-3h-2.25zM6 12.75a3 3 0 00-3 3V18a3 3 0 003 3h2.25a3 3 0 003-3v-2.25a3 3 0 00-3-3H6zM17.625 13.5a.75.75 0 00-1.5 0v2.625H13.5a.75.75 0 000 1.5h2.625v2.625a.75.75 0 001.5 0v-2.625h2.625a.75.75 0 000-1.5h-2.625V13.5z" />
          </svg>
          Drinks
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link className="link-hover link" href="/drinks">
              All Drinks
            </Link>
          </li>
          {sessionData?.user?.role === "admin" && (
            <li>
              <Link className="link-hover link" href="/submit-drink">
                Submit Drink
              </Link>
            </li>
          )}
        </ul>
        {sessionData?.user?.role === "admin" && (
          <div className="dropdown-end dropdown">
            <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
              <div className="w-10 rounded-full">
                <Image
                  src={sessionData?.user?.image ?? ""}
                  alt="profile"
                  width={200}
                  height={200}
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
            >
              <li>
                <Button onClick={() => signOut()}>Logout</Button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
