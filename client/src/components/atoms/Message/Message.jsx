import "./Message.module.scss";
import { Danger } from "./Danger";
import { Success } from "./Success";
import { Warning } from "./Warning";

export const Message = ({ message, success, danger, warning, ...props }) => {
  return (
    <>
      {danger && <Danger message={message} {...props} />}
      {success && <Success message={message} {...props} />}
      {warning && <Warning message={message} {...props} />}
    </>
  );
};
