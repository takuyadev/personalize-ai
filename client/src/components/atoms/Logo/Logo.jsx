import styles from "./Logo.module.scss";
import Image from "next/image";

export const Logo = ({ ...props }) => {
  return (
    <Image
      className={styles.brand}
      src="/logo.png"
      alt="logo"
      width="100"
      height="100"
    />
  );
};
