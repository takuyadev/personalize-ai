import styles from "./LeadCard.module.scss";
import Link from "next/link";
import { Card } from "@/components/atoms/Card/Card";
import { Status } from "@/components/atoms/Status/Status";
import { Message } from "@/components/atoms/Message/Message";
import { SecondaryButton } from "@/components/atoms/Button/SecondaryButton";
import { FaTrash } from "react-icons/fa";
import {
  checkDanger,
  checkSuccess,
  checkWarning,
} from "@/utils/helpers/checkLeadStatus";

export const LeadCard = ({ lead, href, onDelete, ...props }) => {
  const { first_name, last_name, email, personalization } = lead;

  const message = personalization || "This user has no personalization set!";
  const isDanger = checkDanger(lead);
  const isWarning = checkWarning(lead);
  const isSuccess = checkSuccess(lead);

  return (
    <Card {...props}>
      <div className={styles.card_wrapper}>
        <Link className={styles.link} href={href}>
          <div className={styles.name_container}>
            {isDanger && <Status status="danger" />}
            {isWarning && <Status status="warning" />}
            {isSuccess && <Status status="success" />}
            <div className={styles.name}>
              {first_name} {last_name},
              <span className={styles.email}> {email}</span>
            </div>
          </div>
        </Link>
        {isDanger && <Message danger message={message} />}
        {isWarning && <Message warning message={message} />}
        {isSuccess && <Message success message={message} />}
      </div>
      <span className={styles.delete}>
        <SecondaryButton onClick={() => onDelete(lead.id)}>
          <FaTrash />
        </SecondaryButton>
      </span>
    </Card>
  );
};
