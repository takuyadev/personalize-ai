"use client";

import Link from "next/link";
import styles from "./CampaignGallery.module.scss";
import { Searchbar } from "@/components/molecules/Searchbar/Searchbar";
import { CampaignCard } from "@/components/molecules/Cards/CampaignCard/CampaignCard";
import { Loading } from "@/components/atoms/Loading/Loading";
import { Message } from "@/components/atoms/Message/Message";
import { Form } from "@/components/atoms/Form/Form";
import { Dropdown } from "@/components/atoms/Dropdown/Dropdown";
import { PrimaryButton } from "@/components/atoms/Button/PrimaryButton";

export const CampaignGallery = ({
  form,
  onSubmit,
  campaigns,
  nextPage,
  page,
  queryString,
  ...props
}) => {
  const { register, handleSubmit } = form;

  const SearchbarFilter = () => {
    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.search_wrapper}>
          <Searchbar {...register("name")} />
          <Dropdown {...register("created_at")}>
            <option value="desc">Created at (desc)</option>
            <option value="asc">Created at (asc)</option>
          </Dropdown>
        </div>
      </Form>
    );
  };

  // If data is set to null, show loading
  if (!campaigns) {
    return (
      <section className={styles.section} {...props}>
        <SearchbarFilter />
        <span className={styles.center}>
          <Loading loading />
        </span>
      </section>
    );
  }

  // If no campaigns are found
  if (campaigns.length === 0) {
    return (
      <section className={styles.section} {...props}>
        <SearchbarFilter />
        <span className={styles.center}>
          <Message danger message="Could not find any campaigns" />
        </span>
      </section>
    );
  }

  return (
    <section className={styles.section} {...props}>
      <SearchbarFilter />

      {/* Render our all campaigns onto page */}
      <div className={styles.container}>
        {campaigns.map((campaign) => {
          return (
            <Link
              key={campaign.id}
              className={styles.link}
              href={`/dashboard/campaigns/${campaign.id}`}
            >
              <CampaignCard isHover {...campaign} />
            </Link>
          );
        })}
      </div>

      {/* Show load more only when the fetched data doesn't return more than 20 */}
      {campaigns.length === (page + 1) * 20 && (
        <span className={styles.center}>
          <PrimaryButton type="button" onClick={() => nextPage(queryString)}>
            Load more
          </PrimaryButton>
        </span>
      )}

      {/* Show no more found */}
      {campaigns.length !== (page + 1) * 20 && (
        <span className={styles.center}>
          <Message warning message="No more campaigns found" />
        </span>
      )}
    </section>
  );
};
