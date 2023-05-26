import styles from "./SelectInstantlyCampaign.module.scss";
import Link from "next/link";
import { Form } from "@/components/atoms/Form/Form";
import { Loading } from "@/components/atoms/Loading/Loading";
import { Message } from "@/components/atoms/Message/Message";
import { InstantlyCard } from "../../Cards/InstantlyCard/InstantlyCard";

export const SelectInstantlyCampaignForm = ({
  campaigns = null,
  instantlyId = null,
  onClick = console.log,
  ...props
}) => {
  if (!instantlyId) {
    return (
      <Link href="/dashboard/user">
        <span className={styles.center}>
          <Message
            warning
            message="Please click here to configure your Instantly API Key!"
          />
        </span>
      </Link>
    );
  }

  if (!campaigns) {
    return (
      <span className={styles.center}>
        <Loading loading />
      </span>
    );
  }


  if (campaigns.length === 0) {
    return <Message warning message="No sheets found!" />;
  }

  return (
    <Form {...props}>
      {campaigns.map((campaign) => {
        return (
          <InstantlyCard
            isHover
            onClick={() => onClick(campaign.id)}
            name={campaign.name}
          />
        );
      })}
    </Form>
  );
};
