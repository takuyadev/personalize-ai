"use client";

import { TabItem } from "@/components/atoms/TabItem/TabItem";
import styles from "./Tabs.module.scss";

export const Tabs = ({
  tabs = [],
  currentTab = "",
  onClick = () => {},
  ...props
}) => {
  return (
    <ul {...props} className={`${styles.tabs}`}>
      {tabs.map((tab) => {
        return (
          <TabItem
            key={tab.label}
            onClick={() => onClick(tab.label)}
            label={tab.label}
            selected={currentTab === tab.label}
          />
        );
      })}
    </ul>
  );
};
