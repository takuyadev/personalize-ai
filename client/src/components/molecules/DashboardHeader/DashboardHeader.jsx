import { SubtleButton } from "@/components/atoms/Button/SubtleButton";
import styles from "./DashboardHeader.module.scss";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export const DashboardHeader = ({ children, title, href = "/", ...props }) => {
  return (
    <header {...props} className={styles.header}>
      <div className={styles.header_wrapper}>
        <Link href={href}>
          <SubtleButton>
            <FaArrowLeft />
          </SubtleButton>
        </Link>
        <h1 className={styles.title}>{title}</h1>
      </div>
      <div className={styles.children_wrapper}>{children}</div>
    </header>
  );
};
