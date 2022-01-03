import { useForm } from "react-hook-form";
import FormInput from "../components/forminput";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import styles from "../styles/Journal.module.css";

const validationSchema = Yup.object({
  title: Yup.string().required("required"),
});

export default function JournalHead({ className }) {
  const {
    register,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm({ mode: "onTouched", resolver: yupResolver(validationSchema) });

  return (
    <div>
      <FormInput
        className={className}
        placeholder="New Journal Entry"
        register={register}
        type="title"
        error={errors.title}
      />
    </div>
  );
}
