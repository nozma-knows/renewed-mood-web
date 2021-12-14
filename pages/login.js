import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import FormInput from "../components/forminput";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styles from "../styles/Login.module.css";

const LoginForm = ({ register, errors, isDirty, isValid }) => {
  const router = useRouter();

  return (
    <div className={styles.login}>
      <div className={styles.formInputContainer}>
        <FormInput
          className={styles.input}
          placeholder="Email address"
          register={register}
          type="emailAddress"
          error={errors.emailAddress}
        />
      </div>
      <div className={styles.formInputContainer}>
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
      </div>
      <div className={styles.buttons}>
        <input
          className={styles.button}
          style={
            !isDirty || !isValid
              ? { marginRight: "15pt", opacity: "50%" }
              : { marginRight: "15pt", cursor: "pointer" }
          }
          type="submit"
          value="Sign In"
          disabled={!isDirty || !isValid}
        />
        <button
          className={styles.button}
          style={{ marginLeft: "15px", cursor: "pointer" }}
          onClick={() => router.push("/signUp")}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

const onSubmit = (data) => {
  console.log("Data: ", data);
};

const validationSchema = Yup.object({
  password: Yup.string().required("required"),
  emailAddress: Yup.string().email("invalid email").required("required"),
});

export default function Login() {
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
      <div>
        <div className={styles.header}>Login</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LoginForm
            register={register}
            errors={errors}
            isDirty={isDirty}
            isValid={isValid}
          />
        </form>
      </div>
    </div>
  );
}