import styles from "./Page.module.scss";
import { motion } from "framer-motion";
import { fadeDown } from "@/data/animations/fadeDown";

export const Page = ({ children }) => {
  return (
    <motion.div
      variants={fadeDown}
      initial="initial"
      animate="animate"
      exit="initial"
      className={styles.content}
    >
      {children}
    </motion.div>
  );
};
