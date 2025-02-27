"use client";

import { sidebarLinks } from "@/data/dashboard-links";

import { VscSignOut } from "react-icons/vsc";

import SidebarLink from "./SidebarLink";
import { useAppDispathch, useAppSelector } from "@/redux/hooks/hook";
import { logOut, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
import { ModalData } from "@/types";
import { useState } from "react";
import ConfirmationModal from "../common/ConfirmationModal";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useAppDispathch();
  const user = useAppSelector(selectCurrentUser);
  const [confirmationModal, setConfirmationModal] =
    useState<ModalData | null>();
  const navigate = useNavigate();
  const handleLogout = async () => {
    dispatch(logOut());
    navigate("/");
    toast.success("Logged out successfully");
  };
  return (
    <div>
      <>
        <div className="flex justify-between  max-h-[100vh] min-w-[220px] flex-col border-r-[1px] border-r-gray-600 bg-slate-800 py-10 px-3 ">
          <div className="flex flex-col   ">
            <SidebarLink
              key={"home"}
              link={{
                id: "home",
                name: "Home",
                path: "/",
                type: "user",
              }}
              iconName={"VscHome"}
            />
            {sidebarLinks.map((link) => {
              if (link.type && user?.role !== link.type) return null;
              return (
                <SidebarLink
                  key={link.id}
                  link={{
                    id: link.id.toString(),
                    name: link.name,
                    path: link.path,
                    type: link.type,
                  }}
                  iconName={link.icon}
                />
              );
            })}
          </div>
          <div className="flex flex-col  ">
            {" "}
            <div className="mx-auto mt-6   h-[.2px]  w-[90%] bg-gray-500 border border-gray-400" />
            <SidebarLink
              link={{
                id: "settings",
                name: "Settings",
                path: "/dashboard/settings",
                type: "user",
              }}
              iconName="VscSettingsGear"
            />
            <button
              onClick={() =>
                setConfirmationModal({
                  text1: "Are you sure?",
                  text2: "You will be logged out of your account.",
                  btn1Text: "Logout",
                  btn2Text: "Cancel",
                  btn1Handler: () => {
                    handleLogout();
                    setConfirmationModal(null);
                  },
                  btn2Handler: () => {
                    setConfirmationModal(null);
                  },
                })
              }
              className="px-8 py-2 text-sm font-medium text-gray-600"
            >
              <div className="flex items-center gap-x-2 text-gray-300">
                <VscSignOut className="text-lg" />
                <span>Logout</span>
              </div>
            </button>
          </div>
        </div>
        {confirmationModal && (
          <ConfirmationModal modalData={confirmationModal} />
        )}
      </>
    </div>
  );
};

export default Sidebar;
