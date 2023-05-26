import React from "react";
import styles from "./Iframe.module.scss";

const Iframe = () => {
  return (
    <div className={styles.iframe}>
      <iframe 
      src="https://embed.lottiefiles.com/animation/1175"
      style={{ border: "none" }}
      ></iframe>
    </div>
  );
};

export default Iframe;
