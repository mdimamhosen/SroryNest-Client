"use client";
import {
  IUSer,
  logOut,
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useAppDispathch, useAppSelector } from "@/redux/hooks/hook";
import { useState, useRef } from "react";

import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { Link } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";
import useOnClickOutside from "@/utils/useOnClickOutside";

interface ModalData {
  text1: string;
  text2: string;
  btn1Text: string;
  btn2Text: string;
  btn1Handler: () => void;
  btn2Handler: () => void;
}
const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);
  const [confirmationModal, setConfirmationModal] = useState<ModalData | null>(
    null
  );

  const { role } = useAppSelector(selectCurrentUser) as IUSer;
  console.log(role);

  const dispatch = useAppDispathch();
  const handleLogout = async () => {
    setOpen(false);
    dispatch(logOut());
  };

  useOnClickOutside(ref, () => setOpen(false));

  const token = useAppSelector(useCurrentToken);

  if (!token) return null;

  return (
    <div>
      <button className="relative" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-1  ">
          <div className=" hover:scale-95 hover:border  transition-all duration-300 p-[1px] ease-linear border border-gray-100 hover:border-white  rounded-full group">
            <img
              src={"https://i.postimg.cc/BvjNWyM4/user-2.png"}
              width={30}
              height={30}
              className="aspect-square hover:scale-95  rounded-full object-cover    hover:shadow-xl  transition-all duration-300 ease-linear"
            />
          </div>
          <AiOutlineCaretDown className="text-lg text-gray-100" />
        </div>
        {open && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-gray-400 overflow-hidden rounded-md border-[1px] border-gray-400 bg-gray-700"
            ref={ref}
          >
            <Link to={`/dashboard/${role}`} onClick={() => setOpen(false)}>
              <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm hover:bg-gray-600 hover:text-gray-200 text-gray-300">
                <VscDashboard className="text-lg text-gray-300" />
                Dashboard
              </div>
            </Link>

            <div
              onClick={() =>
                setConfirmationModal({
                  text1: "Are you sure?",
                  text2: "You will be logged out of your account.",
                  btn1Text: "Logout",
                  btn2Text: "Cancel",
                  btn1Handler: handleLogout,
                  btn2Handler: () => setConfirmationModal(null),
                })
              }
              className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm   hover:bg-gray-600 hover:text-gray-200 text-gray-300"
            >
              <VscSignOut className="text-lg" />
              Logout
            </div>
          </div>
        )}
      </button>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default ProfileDropdown;
