import Link from "next/link";
import styles from "./SidebarNav.module.scss";
import { SidebarItem } from "@/components/atoms/SidebarItem/SidebarItem";

export const SidebarNav = ({ links = [], ...props }) => {
  return (
    <nav {...props} className={styles.sidebar}>
      <ul>
        {links.map((link, i) => {
          return (
            <Link key={i} href={link.href}>
              <SidebarItem icon={link.icon} label={link.label} />
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};
