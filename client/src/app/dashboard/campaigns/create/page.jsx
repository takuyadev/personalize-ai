"use client"
import styles from "./page.module.scss";
import { ImportCards } from "@/components/organisms/ImportCards/ImportCards";
import { Page } from "@/components/atoms/Page/Page";

export default function Create() {
  return (
    <Page>
      <ImportCards />
    </Page>
  );
}
