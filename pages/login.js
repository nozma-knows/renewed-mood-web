import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import FormInput from "../components/forminput";
import FormButton from "../components/formbutton";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styles from "../styles/Login.module.css";

// Form for loging in to Renewed Mood account.
// Requires - Email and Password
const LoginForm = ({ register, errors, isDirty, isValid, router }) => {
  return (
    <>
      <FormInput
        className={styles.input}
        placeholder="Email address"
        register={register}
        type="emailAddress"
        error={errors.emailAddress}
        showError={true}
      />
      <FormInput
        className={styles.input}
        placeholder="Password"
        register={register}
        type="password"
        error={errors.password}
      />
      <div
        className={styles.forgotPassword}
        onClick={() => router.push("/forgotPassword")}
      >
        Forgot Password?
      </div>
      <div className={styles.buttons}>
        <div style={{ marginRight: "15px" }}>
          <FormButton
            className={styles.button}
            type="submit"
            value="Sign In"
            isDirty={isDirty}
            isValid={isValid}
          />
        </div>
        <button
          className={styles.button}
          style={{ marginLeft: "15px", cursor: "pointer" }}
          onClick={() => router.push("/signUp")}
        >
          Sign Up
        </button>
      </div>
    </>
  );
};

const handleSignIn = async (
  { emailAddress, password },
  setSignedIn,
  user,
  setUser,
  router
) => {
  console.log("Email Address: ", emailAddress);
  console.log("Password: ", password);
  try {
    await Auth.signIn(emailAddress, password);
    setSignedIn(true);
    router.push("/");
  } catch (e) {
    console.log(e);
    alert(`Error signing in: ${e}`);
  }
  Auth.currentAuthenticatedUser()
    .then((user) => setUser(user))
    .catch((e) => console.log("Error finding user: ", e));
  console.log(user);
};

// Called when Sign In button is pressed
const onSubmit = (data, setSignedIn, user, setUser, router) => {
  handleSignIn(data, setSignedIn, user, setUser, router);
  console.log("Data: ", data);
};

// Validation Schema - Defines the requirements for the Sign In Form
const validationSchema = Yup.object({
  password: Yup.string().required("required"),
  emailAddress: Yup.string().email("invalid email").required("required"),
});

export default function Login() {
  const router = useRouter(); // Used to redirect to different page in web app
  const [user, setUser] = useState(null);
  const [signedIn, setSignedIn] = useState(false);

  const {
    register,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm({ mode: "onTouched", resolver: yupResolver(validationSchema) });
  console.log("Errors: ", errors);

  return (
    <div className={styles.container}>
      <Head>
        <title>Renewed Mood | Login</title>
      </Head>
      <div className={styles.header}>Login</div>
      <form
        onSubmit={handleSubmit((data) =>
          onSubmit(data, setSignedIn, user, setUser, router)
        )}
      >
        <LoginForm
          register={register}
          errors={errors}
          isDirty={isDirty}
          isValid={isValid}
          router={router}
        />
      </form>
    </div>
  );
}
