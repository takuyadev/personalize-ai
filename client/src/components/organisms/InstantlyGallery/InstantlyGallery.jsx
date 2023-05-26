import Link from "next/link";
import styles from "./InstantlyGallery.module.scss";
import { Searchbar } from "@/components/molecules/Searchbar/Searchbar";
import { InstantlyCard } from "@/components/molecules/Cards/InstantlyCard/InstantlyCard";

export const InstantlyGallery = ({ campaigns, ...props }) => {
  
  if (!campaigns) {
    return "loading...";
  }

  if (campaigns.length === 0 || campaigns.error) {
    return "could not find anything.";
  }

  return (
    <section className={styles.section} {...props}>
      <Searchbar />
      <div className={styles.container}>
        {campaigns.map((campaign) => {
          return (
            <Link
              className={styles.link}
              href={`/dashboard/analytics/${campaign.id}`}
            >
              <InstantlyCard isHover {...campaign} />
            </Link>
          );
        })}
      </div>
    </section>
  );
};
