"use client";

import styles from "./UpdateLeadForm.module.scss";
import { Input } from "@/components/atoms/Input/Input";
import {
  FaMailBulk,
  FaLinkedin,
  FaGlobe,
  FaComment,
  FaCity,
  FaBuilding,
  FaBriefcase,
} from "react-icons/fa";
import { PrimaryButton } from "@/components/atoms/Button/PrimaryButton";

export const UpdateLeadForm = ({
  form,
  lead,
  onSubmit,
  submitGenerate,
  ...props
}) => {
  const { register, handleSubmit, setValue } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} {...props} className={styles.form}>
      <div className={styles.input_container}>
        <Input
          label="First Name"
          defaultValue={lead.first_name}
          placeholder="Enter First Name"
          {...register("first_name")}
        />
        <Input
          label="Last Name"
          defaultValue={lead.last_name}
          placeholder="Enter Last Name"
          {...register("last_name")}
        />
      </div>
      <Input
        icon={<FaMailBulk />}
        label="Email address"
        defaultValue={lead.email}
        placeholder="Enter Email address"
        {...register("email")}
      />
      <Input
        icon={<FaCity />}
        label="City"
        defaultValue={lead.city}
        placeholder="Enter City"
        {...register("city")}
      />
      <div className={styles.input_container}>
        <Input
          icon={<FaBuilding />}
          label="Company name"
          defaultValue={lead.company_name}
          placeholder="Enter Company Name"
          {...register("company_name")}
        />
        <Input
          icon={<FaBriefcase />}
          label="Position"
          defaultValue={lead.position}
          placeholder="Enter position"
          {...register("position")}
        />
      </div>
      <div className={styles.input_container}>
        <Input
          icon={<FaLinkedin />}
          label="LinkedIn"
          defaultValue={lead.linkedin_url}
          placeholder="Enter LinkedIn URL"
          {...register("linkedin_url")}
        />
        <Input
          icon={<FaGlobe />}
          label="Website"
          defaultValue={lead.website_url}
          placeholder="Enter Website URL"
          {...register("website_url")}
        />
      </div>
      <Input
        label="Keywords"
        placeholder="Enter keywords for generative prompt"
        defaultValue={lead.keywords}
        {...register("keywords")}
      />
      <div className={styles.keyword_container}>
        <Input
          placeholder="Enter new keywords"
          label="Personalization line"
          defaultValue={lead.personalization}
          {...register("personalization")}
          icon={<FaComment />}
        />
        <PrimaryButton
          type="button"
          onClick={async () => {
            const lead = await submitGenerate();
            setValue("personalization", lead);
          }}
        >
          Generate
        </PrimaryButton>
      </div>
      <PrimaryButton type="submit">Update lead</PrimaryButton>
    </form>
  );
};
