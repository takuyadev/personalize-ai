import Link from "next/link";
import styles from "./ImportCards.module.scss";
import { FaGoogleDrive, FaPlusCircle } from "react-icons/fa";
import { IconCard } from "@/components/molecules/Cards/IconCard/IconCard";

export const ImportCards = ({ ...props }) => {
  return (
    <section {...props} className={styles.container}>
      <Link className={styles.link} href="/dashboard/campaigns/create/new">
        <IconCard
          isHover={true}
          label="Start from scatch or from CSV file"
          icon={<FaPlusCircle size={64} />}
        />
      </Link>
      <Link className={styles.link} href="/dashboard/campaigns/create/google">
        <IconCard
          isHover={true}
          label="Import from Google Drive"
          icon={<FaGoogleDrive size={64} />}
        />
      </Link>
    </section>
  );
};
