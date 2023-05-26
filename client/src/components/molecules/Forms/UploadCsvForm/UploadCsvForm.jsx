import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Upload } from "@/components/atoms/Upload/Upload";
import { Form } from "@/components/atoms/Form/Form";
import { getFileNameFromPath } from "@/utils/helpers/getFileNameFromPath";

export const UploadCsvForm = ({ onSubmit = console.log }) => {
  const [uploadLabel, setUploadLabel] = useState("Import CSV file");

  // Setup File upload form hook
  const { register, watch, handleSubmit } = useForm();

  // Update upload form label
  const updateLabel = (e) => {
    const fileName = getFileNameFromPath(e.target.value);
    setUploadLabel(fileName);
  };

  // Listen for changes in form, and invoke onSubmit if it happens
  useEffect(() => {
    const subscription = watch(handleSubmit(onSubmit));
    return () => subscription.unsubscribe();
  }, [handleSubmit, watch]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Upload
        name="csv"
        accept=".csv"
        label={uploadLabel}
        {...register("campaign", {
          accept: ".csv",
          onChange: updateLabel,
        })}
      />
    </Form>
  );
};
