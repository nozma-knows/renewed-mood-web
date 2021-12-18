import React, { useState } from "react";
import { Auth } from "aws-amplify";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import FormInput from "../components/forminput";
import FormButton from "../components/formbutton";
import BackButton from "../components/backbutton";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { AiFillCaretLeft } from "react-icons/ai";
import styles from "../styles/ForgotPassword.module.css";

const ForgotPasswordForm = ({ register, errors, isDirty, isValid }) => {
  return (
    <div className={styles.container}>
      <FormInput
        className={styles.input}
        placeholder="Email address"
        register={register}
        type="emailAddress"
        error={errors.emailAddress}
      />
      <FormButton
        className={styles.button}
        type="submit"
        value="Send Email"
        isDirty={isDirty}
        isValid={isValid}
      />
    </div>
  );
};

const NewPasswordForm = ({ register, errors, isDirty, isValid }) => {
  return (
    <div className={styles.container}>
      <FormInput
        className={styles.input}
        placeholder="Verification Code"
        register={register}
        type="confirmation"
        error={errors.confirmation}
        showError={true}
      />
      <FormInput
        className={styles.input}
        placeholder="New Password"
        register={register}
        type="password"
        error={errors.emailAddress}
      />
      <FormButton
        className={styles.button}
        type="submit"
        value="Update Password"
        isDirty={isDirty}
        isValid={isValid}
      />
    </div>
  );
};

const handleForgotPassword = async ({ emailAddress }, setEmailSent) => {
  try {
    await Auth.forgotPassword(emailAddress);
    setEmailSent(true);
  } catch (error) {
    console.log("Error with Email verification for forgot password: ", error);
  }
};

const updatePassword = async (
  { emailAddress, confirmation, password },
  router
) => {
  try {
    await Auth.forgotPasswordSubmit(emailAddress, confirmation, password);
    console.log("Password successfully reset");
    router.push("/login");
  } catch (error) {
    console.log("Error reseting password: ", error);
  }
};

const onSubmit = (data, emailSent, setEmailSent, router) => {
  if (!emailSent) {
    handleForgotPassword(data, setEmailSent);
  } else {
    updatePassword(data, router);
  }
};

const forgotPasswordValidationSchema = Yup.object({
  emailAddress: Yup.string().email("invalid email").required("required"),
});

const newPasswordValidationSchema = Yup.object({
  confirmation: Yup.string()
    .required("required")
    .matches(/^\d+$/, "invalid code")
    .length(6, "invalid code"),
  password: Yup.string().required("required"),
});

export default function ForgotPassword() {
  const router = useRouter();
  const [emailSent, setEmailSent] = useState(false);
  const {
    register,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(
      !emailSent ? forgotPasswordValidationSchema : newPasswordValidationSchema
    ),
  });
  console.log("Errors: ", errors);

  return (
    <div className={styles.container}>
      <Head>
        <title>Renewed Mood | Forgot Password</title>
      </Head>
      <BackButton push="login" value="Back to Sign In" />
      <div className={styles.header}>Password Recovery</div>
      <form
        onSubmit={handleSubmit((data) =>
          onSubmit(data, emailSent, setEmailSent, router)
        )}
      >
        {!emailSent ? (
          <ForgotPasswordForm
            register={register}
            errors={errors}
            isDirty={isDirty}
            isValid={isValid}
          />
        ) : (
          <NewPasswordForm
            register={register}
            errors={errors}
            isDirty={isDirty}
            isValid={isValid}
          />
        )}
      </form>
    </div>
  );
}
