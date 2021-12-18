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
// import styles from "../styles/Login.module.css";
import styles from "../styles/SignUp.module.css";

// Form for signing up for Renewed Mood account.
// Requires - First Name, Last Name, Email and Password
const SignUpForm = ({ register, errors, isDirty, isValid }) => {
  return (
    <div className={styles.container}>
      <div className={styles.formRow}>
        <FormInput
          className={styles.squeezedInput}
          placeholder="First Name"
          register={register}
          type="firstName"
          error={errors.firstName}
        />
        <FormInput
          className={styles.squeezedInput}
          placeholder="Last Name"
          register={register}
          type="lastName"
          error={errors.lastName}
        />
      </div>
      <div className={styles.formRow}>
        <FormInput
          className={styles.input}
          placeholder="Email address"
          register={register}
          type="emailAddress"
          error={errors.emailAddress}
          showError={true}
        />
      </div>
      <div className={styles.formRow}>
        <FormInput
          className={styles.input}
          placeholder="Password"
          register={register}
          type="password"
          error={errors.password}
        />
      </div>
      <FormButton
        className={styles.button}
        type="submit"
        value="Sign Up"
        isDirty={isDirty}
        isValid={isValid}
      />
    </div>
  );
};

const ConfirmSignUpForm = ({ register, errors, isDirty, isValid }) => {
  return (
    <div className={styles.container}>
      <FormInput
        className={styles.input}
        placeholder="Email"
        register={register}
        type="emailAddress"
        error={errors.emailAddress}
      />
      <FormInput
        className={styles.input}
        placeholder="Confirmation Code"
        register={register}
        type="confirmation"
        error={errors.confirmation}
        showError={true}
      />
      <FormButton
        className={styles.button}
        type="submit"
        value="Confirm"
        isDirty={isDirty}
        isValid={isValid}
      />
    </div>
  );
};

const HandleSignUp = async (
  { firstName, lastName, emailAddress, password },
  setConfirmSignUp,
  setHeader
) => {
  try {
    const { user } = await Auth.signUp({
      username: emailAddress,
      password: password,
      attributes: {
        email: emailAddress,
        name: firstName,
        family_name: lastName,
      },
    });
    console.log("User: ", user);
    setConfirmSignUp(true);
    setHeader("Confirm Sign Up");
  } catch (error) {
    console.log("Error signing up: ", error);
  }
};

const HandleConfirmSignUp = async ({ emailAddress, confirmation }, router) => {
  try {
    await Auth.confirmSignUp(emailAddress, confirmation);
    router.push("/login");
    console.log("Sign up confirmed!");
  } catch (error) {
    console.log("Error confirming sign up: ", error);
  }
};

// Called when Sign Up button is pressed
const onSubmit = (data, confirmSignUp, setConfirmSignUp, setHeader, router) => {
  console.log("Data: ", data);
  if (!confirmSignUp) {
    HandleSignUp(data, setConfirmSignUp, setHeader);
  } else {
    HandleConfirmSignUp(data, router);
  }
};

// Validation Schema - Defines the requirements for the Sign Up Form
const signUpValidationSchema = Yup.object({
  firstName: Yup.string().required("required"),
  lastName: Yup.string().required("required"),
  emailAddress: Yup.string().email("invalid email").required("required"),
  password: Yup.string().required("required"),
});

const confirmSignUpValidationSchema = Yup.object({
  emailAddress: Yup.string().email("invalid email").required("required"),
  confirmation: Yup.string()
    .required("required")
    .matches(/^\d+$/, "invalid code")
    .length(6, "invalid code"),
});

export default function SignUp() {
  const router = useRouter(); // Used to redirect to different page in web app

  const [confirmSignUp, setConfirmSignUp] = useState(false);
  const [header, setHeader] = useState("Sign Up");

  const {
    register,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(
      !confirmSignUp ? signUpValidationSchema : confirmSignUpValidationSchema
    ),
  });

  console.log("Errors: ", errors);
  console.log("isDirty: ", isDirty);
  console.log("isValid: ", isValid);

  return (
    <div className={styles.container}>
      <Head>
        <title>Renewed Mood | Sign Up</title>
      </Head>
      <BackButton push="login" value="Back to Sign In" />
      <div>
        <div className={styles.header}>{header}</div>
        <form
          onSubmit={handleSubmit((data) =>
            onSubmit(data, confirmSignUp, setConfirmSignUp, setHeader, router)
          )}
        >
          {!confirmSignUp ? (
            <SignUpForm
              register={register}
              errors={errors}
              isDirty={isDirty}
              isValid={isValid}
            />
          ) : (
            <ConfirmSignUpForm
              register={register}
              errors={errors}
              isDirty={isDirty}
              isValid={isValid}
            />
          )}
        </form>
      </div>
    </div>
  );
}
