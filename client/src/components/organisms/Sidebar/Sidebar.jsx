"use client";
import styles from "./Sidebar.module.scss";
import { SidebarNav } from "@/components/molecules/SidebarNav/SidebarNav";
import { FaHome, FaPlusCircle, FaTrophy } from "react-icons/fa";
import { VscGraph } from "react-icons/vsc";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { UserSettings } from "@/components/molecules/UserSettings/UserSettings";

const LINKS = [
  {
    id: "dashboard",
    href: "/dashboard",
    label: "Home",
    icon: <FaHome />,
  },
  {
    id: "create",
    href: "/dashboard/campaigns/create",
    label: "Create Campaign",
    icon: <FaPlusCircle />,
  },
  {
    id: "campaigns",
    href: "/dashboard/campaigns",
    label: "Campaigns",
    icon: <FaTrophy />,
  },
  // {
  //   id: "analytics",
  //   href: "/dashboard/analytics",
  //   label: "Analytics",
  //   icon: <VscGraph />,
  // },
];

export const Sidebar = ({ selected, ...props }) => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <section className={styles.section} {...props}>
      <SidebarNav links={LINKS} />
      {isLoggedIn && <UserSettings isLoggedIn={isLoggedIn} />}
    </section>
  );
};
