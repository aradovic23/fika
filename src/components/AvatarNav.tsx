import { signOut } from "next-auth/react";
import Image from "next/image";
import type { FC } from "react";
import React from "react";
import Button from "./Button";

interface AvatarProps {
  userImage: string;
  userName: string;
  userRole: string;
}

export const AvatarNav: FC<AvatarProps> = ({
  userName,
  userImage,
  userRole,
}) => {
  return (
    <div className="dropdown-end dropdown">
      <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
        <div className="w-10 rounded-full">
          <Image src={userImage ?? ""} alt="profile" width={200} height={200} />
        </div>
      </label>
      <div
        tabIndex={0}
        className="card-compact card dropdown-content mt-3 w-52 bg-base-100 shadow"
      >
        <div className="card-body">
          <span className="text-lg font-bold">{userName}</span>
          <span className="text-info">Role: {userRole}</span>
          <div className="card-actions">
            <Button
              size="btn-sm"
              variant="btn-circle"
              onClick={() => signOut()}
            >
              Log out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
