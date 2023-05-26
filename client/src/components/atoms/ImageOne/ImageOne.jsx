import React from "react";
import styles from "./ImageOne.module.scss";
import { motion } from "framer-motion";

const ImageOne = () => {
  return (
    <div className={styles.imageOne}>
      <div className={styles.firstDiv}>
      </div>
      <div className={styles.container}>
        <div className={styles.secondDiv}>
          <div className={styles.sectionTitle}>
            <h2>Turn Emails into Revenue</h2>
            <p>Why personalize?</p>
          </div>
          <p className={styles.personalize}>
            Personalizing a cold email is crucial for making a positive first
            impression and increases the likelihood of a response. 
            Our app is designed to help you automate that!
          </p>
        </div>
        <motion.div
          initial={{
            x: 200,
            opacity: 0,
          }}
          whileInView={{
            x: 0,
            opacity: 1,
            transition: {
              duration: 2,
              ease: [0.215, 0.61, 0.355, 1.0],
            },
          }}
          className={styles.thirdDiv}
        />
      </div>
    </div>
  );
};

export default ImageOne;
