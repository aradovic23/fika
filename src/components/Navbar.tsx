import { useSession } from "next-auth/react";
import Link from "next/link";
import type { FC } from "react";
import { useState } from "react";
import React from "react";
import { AvatarNav } from "./AvatarNav";
import { Bars2Icon } from "@heroicons/react/24/outline";

export const menuItems = [
  { name: "Drinks", path: "/drinks" },
  { name: "Submit Drink", path: "/submit-drink" },
  { name: "Edit Category", path: "/edit-category" },
];

const Navbar: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: sessionData } = useSession();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const closeDrawer = () => setIsDrawerOpen(false);

  const handleDrawerToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDrawerOpen(!event.target.checked);
  };

  return (
    <div className="drawer">
      <input
        id="my-drawer-3"
        type="checkbox"
        className="drawer-toggle"
        checked={isDrawerOpen}
        onChange={handleDrawerToggle}
      />
      <div className="drawer-content flex flex-col">
        <div className="navbar w-full bg-base-300">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              className="btn-ghost btn-square btn"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
              <Bars2Icon className="h-6 w-6" />
            </label>
          </div>
          <div className="mx-2 flex-1 justify-between px-2">
            <a className="btn-ghost btn text-xl normal-case">Drinks App</a>
          </div>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal">
              {sessionData?.user?.role === "admin" ? (
                <>
                  <li>
                    {menuItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.path}
                        className="rounded-md"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </li>
                </>
              ) : (
                <Link href="/drinks">Drinks</Link>
              )}
            </ul>
          </div>
          {sessionData?.user?.role === "admin" && (
            <AvatarNav
              userImage={sessionData?.user.image ?? ""}
              userName={sessionData?.user.name ?? ""}
              userRole={sessionData?.user.role}
            />
          )}
        </div>
        {children}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          className="drawer-overlay"
          onClick={closeDrawer}
        ></label>
        <ul className="menu w-80 bg-base-100 p-4">
          <li>
            {menuItems.map((item) => (
              <Link key={item.name} href={item.path} onClick={closeDrawer}>
                {item.name}
              </Link>
            ))}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
