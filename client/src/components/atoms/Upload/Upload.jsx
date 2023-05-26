import { forwardRef } from "react";
import styles from "./Upload.module.scss";
import { FaPlusCircle } from "react-icons/fa";

export const Upload = forwardRef(
  (
    {
      accept,
      name,
      label,
      icon = <FaPlusCircle />,
      encType = "multipart/form",
      ...props
    },
    ref,
  ) => {
    return (
      <>
        <label htmlFor={name} className={styles.file_label}>
          <span>{label}</span>
          {icon && icon}
        </label>
        <input
          type="file"
          ref={ref}
          className={styles.file_input}
          id={name}
          name={name}
          accept={accept}
          encType={encType}
          {...props}
        />
      </>
    );
  },
);
