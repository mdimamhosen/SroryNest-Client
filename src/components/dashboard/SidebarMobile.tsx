import { sidebarLinks } from "@/data/dashboard-links";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks/hook";
import { ModalData } from "@/types";
import { useEffect, useState } from "react";
import { VscChromeClose, VscSignOut, VscThreeBars } from "react-icons/vsc";
import SidebarLink from "./SidebarLink";
import ConfirmationModal from "../common/ConfirmationModal";

const SidebarMobile = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState<ModalData | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);

  const user = useAppSelector(selectCurrentUser);

  // Handle sidebar visibility on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false); // Automatically close sidebar on wider screens
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check window size on mount

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup on unmount
    };
  }, []);

  // Toggle sidebar open/close on mobile
  const toggleNav = () => setIsOpen(!isOpen);

  // Handle logout
  const handleLogout = async () => {
    // You can dispatch a logout action here if needed.
    // For now, just logging a message:
    console.log("Logging out...");
    setIsNavOpen(false);
    // Optionally, navigate to a different page after logout
    // navigate('/');
  };

  return (
    <>
      {/* Hamburger icon for mobile */}
      <button
        className="md:hidden text-gray-400 w-fit px-4 py-1"
        onClick={toggleNav}
      >
        {isNavOpen ? (
          <VscThreeBars className="text-2xl" />
        ) : (
          <>
            <VscThreeBars className="text-2xl" />
          </>
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0   z-50 flex flex-col h-[100vh] w-64 bg-slate-800 border-r-[1px] border-gray-600 py-5 px-3 shadow-lg transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white  ">StroyNest</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-300 hover:text-gray-200 transition-all duration-300 ease-linear"
          >
            <VscChromeClose className="text-2xl" />
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col flex-grow mt-4 space-y-2">
          <SidebarLink
            key={"home"}
            link={{
              id: "home",
              name: "Home",
              path: "/",
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

        {/* Divider */}
        <div className="mx-auto mt-2 h-[0.5px] w-[90%] bg-gray-500" />

        {/* Settings & Logout */}
        <div className="flex flex-col mt-4">
          <SidebarLink
            link={{
              name: "Settings",
              path: "/dashboard/settings",
              id: "settings",
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
                btn1Handler: handleLogout,
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="flex items-center px-8 py-2 mt-2 text-sm font-medium text-gray-600 hover:bg-gray-700 hover:text-white rounded transition-colors duration-200"
          >
            <div className="flex items-center gap-x-2 text-gray-300">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default SidebarMobile;
