"use client";

import styles from "./CreateLeadForm.module.scss";
import { Input } from "@/components/atoms/Input/Input";
import {
  FaMailBulk,
  FaLinkedin,
  FaGlobe,
  FaCity,
  FaBuilding,
  FaBriefcase,
} from "react-icons/fa";
import { PrimaryButton } from "@/components/atoms/Button/PrimaryButton";
import { Divider } from "@/components/atoms/Divider/Divider";
import { Form } from "@/components/atoms/Form/Form";

export const CreateLeadForm = ({
  form,
  onSubmit,
  buttonLabel = "Submit lead",
  ...props
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, },
  } = form;

  return (
    <Form onSubmit={handleSubmit(onSubmit)} {...props}>
      <div className={styles.form_wrapper}>
        <div className={styles.col}>
          <Input
            label="First Name"
            placeholder="Enter First Name"
            danger={errors.first_name?.type}
            {...register("first_name", { required: true })}
          />
          <Input
            label="Last Name"
            placeholder="Enter Last Name"
            danger={errors.last_name?.type}
            {...register("last_name", { required: true })}
          />
          <Input
            icon={<FaMailBulk />}
            type="email"
            label="Email address"
            placeholder="Enter Email address"
            danger={errors.last_name?.type}
            {...register("email", { required: true })}
          />
          <Input
            icon={<FaCity />}
            label="City"
            placeholder="Enter City"
            {...register("city")}
          />
          <Input
            icon={<FaBuilding />}
            label="Company name"
            placeholder="Enter Company Name"
            {...register("company_name")}
          />
          <Input
            icon={<FaBriefcase />}
            label="Position"
            placeholder="Enter position"
            {...register("position")}
          />
        </div>
        <div className={styles.col}>
          <Input
            icon={<FaLinkedin />}
            label="LinkedIn"
            placeholder="Enter LinkedIn URL"
            {...register("website_url")}
          />
          <Input
            icon={<FaGlobe />}
            label="Website"
            placeholder="Enter Website URL"
            {...register("website_url")}
          />
          <Input
            label="Keywords"
            placeholder="Enter keywords "
            {...register("keywords")}
          />
        </div>
      </div>

      <Divider />
      <PrimaryButton type="submit">{buttonLabel}</PrimaryButton>
    </Form>
  );
};
