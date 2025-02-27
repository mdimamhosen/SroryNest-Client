export const ACCOUNT_TYPE = {
  ADMIN: "admin",
  USER: "user",
};

export const sidebarLinks = [
  {
    id: 11,
    name: "Dashboard",
    path: "/dashboard/admin",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscAccount",
  },
  {
    id: 12,
    name: "Dashboard",
    path: "/dashboard/user",
    type: ACCOUNT_TYPE.USER,
    icon: "VscAccount",
  },
  {
    id: 1,
    name: "All Users",
    path: "/dashboard/admin/all-users",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscPerson",
  },
  {
    id: 2,
    name: "Add Book",
    path: "/dashboard/admin/add-book",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscBook",
  },
  {
    id: 3,
    name: "View All Books",
    path: "/dashboard/admin/see-all-book",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscVm",
  },
  {
    id: 4,
    name: "View Orders",
    path: "/dashboard/user/view-orders",
    type: ACCOUNT_TYPE.USER,
    icon: "VscAdd",
  },
  {
    id: 5,
    name: "Manage Orders",
    path: "/dashboard/admin/manage-orders",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscAdd",
  },
];
