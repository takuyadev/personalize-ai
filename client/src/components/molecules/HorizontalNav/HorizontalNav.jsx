"use client";

import styles from "./HorizontalNav.module.scss";
import { NavItem } from "@/components/atoms/NavItem/NavItem";
import { SecondaryButton } from "@/components/atoms/Button/SecondaryButton";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import Image from "next/image";

export const HorizontalNav = ({ ...props }) => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <nav {...props} className={styles.nav}>
      <Link href={"/"}>
        <div className={styles.brand}>
          <Image
            src="/logo.png"
            alt="logo"
            width="120"
            height="120"
            className={styles.logo}
          ></Image>
          <h1 className={styles.text}>Personalize.ai</h1>
        </div>
      </Link>
      <div className={styles.navlinks}>
        {!isLoggedIn && (
          <ul className={styles.navlist}>
            <NavItem className={styles.navitem} href="/onboarding">
              <SecondaryButton>GET STARTED</SecondaryButton>
            </NavItem>
          </ul>
        )}

        {isLoggedIn && (
          <ul className={styles.navlist}>
            <NavItem className={styles.navitem} href="/dashboard">
              <SecondaryButton>DASHBOARD</SecondaryButton>
            </NavItem>
            <SecondaryButton onClick={logout}>LOGOUT</SecondaryButton>
          </ul>
        )}
      </div>
    </nav>
  );
};
