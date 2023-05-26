import styles from "./UserSettings.module.scss";
import { Card } from "@/components/atoms/Card/Card";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

export const UserSettings = ({ isLoggedIn, ...props }) => {
  return (
    <div className={styles.card_wrapper}>
      <Card {...props}>
        <Link href="/dashboard/user">
          <div className={styles.user}>
            <FaUserCircle />
            <span>{isLoggedIn.email}</span>
          </div>
        </Link>
      </Card>
    </div>
  );
};
