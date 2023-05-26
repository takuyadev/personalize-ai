"use client";
import styles from "./Card.module.scss";

export const Card = ({ children, selected, onClick, isHover, className, ...props }) => {
  const hoverClasses = isHover || onClick ? styles.card_click : "";
  const selectClasses = selected ? styles.card_select : "";

  return (
    <article
      {...props}
      onClick={onClick}
      className={`${styles.card} ${hoverClasses} ${selectClasses}`}
    >
      {children}
    </article>
  );
};
