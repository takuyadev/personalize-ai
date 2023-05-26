"use client";
import styles from "./UpdateUserForm.module.scss";
import { PrimaryButton } from "@/components/atoms/Button/PrimaryButton";
import { Form } from "@/components/atoms/Form/Form";
import { Input } from "@/components/atoms/Input/Input";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { getUser, updateUser } from "@/services/user";
import { useMode } from "@/hooks/useMode";
import { Message } from "@/components/atoms/Message/Message";
import { Card } from "@/components/atoms/Card/Card";

export const UpdateUserForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Call in useMode hook
  const { mode, transition } = useMode("NONE");

  // Handle submit form when user is updated
  const onSubmit = async (formData) => {
    const data = await updateUser(formData);
    data ? transition("SUCCESS") : transition("ERROR");
  };

  // Update form values based on fetched user
  useEffect(() => {
    const fetchApi = async () => {
      const data = await getUser();

      // Set the values of the form only when data was success
      if (data) {
        setValue("first_name", data.first_name);
        setValue("last_name", data.last_name);
        setValue("instantly_id", data.instantly_id);
      }
    };
    fetchApi();
  }, []);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {mode === "SUCCESS" && (
        <Card>
          <Message success message="Successfully updated user!" />
        </Card>
      )}
      {mode === "ERROR" && (
        <Card>
          <Message danger message="Could not updated user! " />
        </Card>
      )}
      <Input
        label="First Name"
        danger={errors.first_name?.type}
        {...register("first_name", { required: true })}
      />
      <Input
        danger={errors.last_name?.type}
        label="Last Name"
        {...register("last_name", { required: true })}
      />
      <Input
        type="password"
        danger={errors.instantly_id?.type}
        label="Instantly ID"
        {...register("instantly_id")}
      />
      <PrimaryButton>Update settings</PrimaryButton>
    </Form>
  );
};
