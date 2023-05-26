import styles from "./Header.module.scss";
import Link from "next/link";
import { Logo } from "@/components/atoms/Logo/Logo";
import { HorizontalNav } from "@/components/molecules/HorizontalNav/HorizontalNav";

export const Header = ({ ...props }) => {
  return (
    <header {...props} className={styles.header}>

      <HorizontalNav />
    </header>
  );
};
