"use client";
import styles from "./page.module.scss";
import Iframe from "@/components/atoms/Iframe/Iframe";
import SectionOne from "@/components/organisms/SectionOne/SectionOne";
import SectionTwo from "@/components/organisms/SectionTwo/SectionTwo";
import SectionThree from "@/components/organisms/SectionThree/SectionThree";
import { PrimaryButton } from "@/components/atoms/Button/PrimaryButton";
import { motion } from "framer-motion";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaChartBar, FaRobot } from "react-icons/fa";
import {
  staggerDownItem,
  staggerDownParent,
} from "@/data/animations/staggerFadeDown";
import { loopAnimation } from "@/data/animations/loopAnimation";

const MotionSection = ({ children }) => {
  return (
    <motion.section
      initial="initial"
      variants={staggerDownParent}
      whileInView="animate"
    >
      {children}
    </motion.section>
  );
};

export default function Home() {
  const { isLoggedIn } = useContext(AuthContext);
  const { push } = useRouter();

  if (isLoggedIn.token) {
    push("/dashboard");
  }

  return (
    <>
      <main className={styles.home}>
        <motion.div
          variants={staggerDownParent}
          initial="initial"
          animate="animate"
          exit="initial"
          className={styles.herotext}
        >
          <motion.div
            variants={loopAnimation}
            transition={loopAnimation.transition}
            animate={loopAnimation.animate}
            className={styles.icon_chart}
          >
            <FaChartBar size={128} />
          </motion.div>
          <motion.h1 variants={staggerDownItem} className={styles.heroheadline}>
            10x your response rate <br />
            <span className={styles.highlight}>with the power of AI.</span>
          </motion.h1>
          <motion.p variants={staggerDownItem} className={styles.herosubtext}>
            Personalize.ai automates the process of writing personalized opening
            line for cold emails, saving you time and money
          </motion.p>
          <motion.span variants={staggerDownItem}>
            <Link href="/onboarding">
              <PrimaryButton>START FOR FREE</PrimaryButton>
            </Link>
          </motion.span>
          <motion.span variants={staggerDownItem}>
            <Iframe></Iframe>
          </motion.span>
          <motion.div
            transition={loopAnimation.transition}
            animate={loopAnimation.animate}
            className={styles.icon_user}
          >
            <FaRobot size={64} />
          </motion.div>
        </motion.div>
      </main>
      <sections className={styles.wrapper}>
        <MotionSection>
          <SectionOne />
        </MotionSection>
        <MotionSection>
          <SectionTwo />
        </MotionSection>
        <MotionSection>
          <SectionThree />
        </MotionSection>
      </sections>
    </>
  );
}
