import { useForm } from "react-hook-form";
import { Form } from "@/components/atoms/Form/Form";
import { Input } from "@/components/atoms/Input/Input";
import { PrimaryButton } from "@/components/atoms/Button/PrimaryButton";

export const CreateCampaignForm = ({
  onSubmit = console.log,
  buttonLabel,
}) => {
  // Setup useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        defaultValue="New Campaign"
        label="Campaign name"
        danger={errors.name?.type}
        {...register("name", { required: true })}
      />
      <PrimaryButton type="submit">{buttonLabel}</PrimaryButton>
    </Form>
  );
};
