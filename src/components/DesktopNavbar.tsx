import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Squares2X2Icon } from "@heroicons/react/24/solid";
import { AvatarNav } from "./AvatarNav";

export const menuItems = [
  { name: "Drinks", path: "/drinks" },
  { name: "Submit Drink", path: "/submit-drink" },
  { name: "Edit Category", path: "/edit-category" },
];
export const DesktopNavbar = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="navbar hidden bg-base-300 md:flex">
      <div className="flex-1">
        <a className="btn-ghost btn text-xl normal-case">Drinks App</a>
      </div>
      {sessionData?.user?.role === "admin" && (
        <div className="flex-none">
          <div className="dropdown-end dropdown">
            <label tabIndex={0} className="btn-ghost btn-circle btn">
              <div className="indicator">
                <Squares2X2Icon className="h-6 w-6 " />
              </div>
            </label>

            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
              onClick={() => {
                if (document.activeElement instanceof HTMLElement) {
                  document.activeElement.blur();
                }
              }}
            >
              <li>
                {menuItems.map((item) => (
                  <Link key={item.name} href={item.path}>
                    {item.name}
                  </Link>
                ))}
              </li>
            </ul>
          </div>
          <AvatarNav
            userImage={sessionData?.user.image ?? ""}
            userName={sessionData?.user.name ?? ""}
            userRole={sessionData?.user.role}
          />
        </div>
      )}
    </div>
  );
};
