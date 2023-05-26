import Link from "next/link";
import styles from "./LeadProfile.module.scss";
import { FaGlobe, FaLinkedin } from "react-icons/fa";
import { Badge } from "@/components/atoms/Badge/Badge";
import { Message } from "@/components/atoms/Message/Message";
import { Status } from "@/components/atoms/Status/Status";
import { Blockquote } from "@/components/atoms/Blockquote/Blockquote";
import {
  checkDanger,
  checkSuccess,
  checkWarning,
} from "@/utils/helpers/checkLeadStatus";

export const LeadProfile = ({ lead, ...props }) => {
  const isDanger = checkDanger(lead);
  const isSuccess = checkSuccess(lead);
  const isWarning = checkWarning(lead);

  return (
    <section {...props} className={styles.container}>
      <header className={styles.header}>
        <div>
          <span className={styles.heading}>
            {isDanger && <Status status="danger" />}
            {isWarning && <Status status="warning" />}
            {isSuccess && <Status status="success" />}
            <h1>
              {lead.first_name} {lead.last_name}
            </h1>
          </span>
          <h3>{lead.email}</h3>
        </div>
      </header>

      <div className={styles.badges}>
        {lead.linkedin_url && (
          <a target="_blank" rel="noopener noreferrer" href={lead.linkedin_url}>
            <Badge label={lead.linkedin_url} icon={<FaLinkedin />} />
          </a>
        )}

        {lead.website_url && (
          <a target="_blank" rel="noopener noreferrer" href={lead.website_url}>
            <Badge label={lead.website_url} icon={<FaGlobe />} />
          </a>
        )}
      </div>

      {lead.personalization ? (
        <Blockquote>{lead.personalization}</Blockquote>
      ) : (
        <Message danger message="This lead has no personalization!" />
      )}
    </section>
  );
};
