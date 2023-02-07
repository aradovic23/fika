import { HomeIcon, Squares2X2Icon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { menuItems } from "./DesktopNavbar";
import Link from "next/link";
import { AvatarNav } from "./AvatarNav";

export const MobileNavbar = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="btm-nav z-50 md:hidden">
      <Link href="/">
        <button>
          <HomeIcon className="h-5 w-5" />
        </button>
      </Link>
      {sessionData?.user?.role === "admin" && (
        <>
          <button>
            <div className="dropdown dropdown-top">
              <label tabIndex={0} className="btn m-1">
                <Squares2X2Icon className="h-5 w-5" />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
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
          </button>
          <button>
            <div className="dropdown dropdown-top">
              <AvatarNav
                userImage={sessionData?.user.image ?? ""}
                userName={sessionData?.user.name ?? ""}
                userRole={sessionData?.user.role}
              />
            </div>
          </button>
        </>
      )}
    </div>
  );
};
