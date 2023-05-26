"use client";
import styles from "./page.module.scss";
import { useContext } from "react";
import { Sidebar } from "@/components/organisms/Sidebar/Sidebar";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";

export default function Layout({ children }) {
  const { isLoggedIn } = useContext(AuthContext);
  const { push } = useRouter();

  if (!isLoggedIn) {
    push("/onboarding");
  }

  return (
    <div className={styles.page}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <main className={styles.content}>
        <AnimatePresence>{children}</AnimatePresence>
      </main>
    </div>
  );
}
