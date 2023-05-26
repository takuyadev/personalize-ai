"use client";
import styles from "./page.module.scss";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Layout({ children }) {
  const { isLoggedIn } = useContext(AuthContext);
  const { push } = useRouter();

  if (!isLoggedIn) {
    push("/onboarding");
  }

  return children;
}
