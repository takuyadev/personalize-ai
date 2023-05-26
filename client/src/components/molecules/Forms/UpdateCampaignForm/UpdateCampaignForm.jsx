"use client";
import styles from "./UpdateCampaignForm.module.scss";
import { Form } from "@/components/atoms/Form/Form";
import { PrimaryButton } from "@/components/atoms/Button/PrimaryButton";
import { Input } from "@/components/atoms/Input/Input";
import { useForm } from "react-hook-form";

export const UpdateCampaignForm = ({
  form = useForm(),
  onSubmit = console.log,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("name", { required: true })}
        label="Campaign name"
        danger={errors.name?.type}
      />
      <Input {...register("googlesheet_id")} label="Google Sheet ID" />
      <Input {...register("instantly_id")} label="Instantly Campaign ID" />
      <PrimaryButton type="submit">Update Campaign</PrimaryButton>
    </Form>
  );
};
