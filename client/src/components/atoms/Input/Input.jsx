"use client";
import styles from "./Input.module.scss";
import { forwardRef } from "react";

export const Input = forwardRef(
  (
    {
      id,
      name,
      icon,
      placeholder,
      value,
      label,
      onChange,
      danger,
      type = "text",
      required = false,
      ...props
    },
    ref,
  ) => {
    let style = {};

    if (icon) {
      style.paddingLeft = "3em";
    }

    if (danger) {
      style.borderColor = "#f43f5e";
      style.color = "#f43f5e";
    }

    return (
      <div className={styles.container}>
        {label && <label>{label}</label>}
        {icon && <span className={styles.icon}>{icon}</span>}
        <input
          className={styles.input}
          style={style}
          id={id}
          type={type}
          name={name}
          value={value}
          required={required}
          placeholder={placeholder}
          onChange={onChange}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
