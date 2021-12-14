import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import FormInput from "../components/forminput";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { AiFillCaretLeft } from "react-icons/ai";
import styles from "../styles/Login.module.css";

const SignUpForm = ({ register, errors, isDirty, isValid }) => {
  return (
    <>
      <div className={styles.formInputContainer}>
        <FormInput
          className={styles.input}
          placeholder="First name"
          register={register}
          type="firstName"
          error={errors.firstName}
        />
      </div>
      <div className={styles.formInputContainer}>
        <FormInput
          className={styles.input}
          placeholder="Last name"
          register={register}
          type="lastName"
          error={errors.lastName}
        />
      </div>
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
          value="Sign Up"
          disabled={!isDirty || !isValid}
        />
      </div>
    </>
  );
};

const onSubmit = (data) => {
  console.log("Data: ", data);
};

const validationSchema = Yup.object({
  firstName: Yup.string().required("required"),
  lastName: Yup.string().required("required"),
  emailAddress: Yup.string().email("invalid email").required("required"),
  password: Yup.string().required("required"),
});

export default function SignUp() {
  const router = useRouter();

  const {
    register,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm({ mode: "onTouch", resolver: yupResolver(validationSchema) });
  console.log("Errors: ", errors);
  return (
    <div className={styles.container}>
      <Head>
        <title>Renewed Mood | Sign Up</title>
      </Head>
      <div className={styles.back} onClick={() => router.push("/login")}>
        <AiFillCaretLeft className={styles.backCarrot} />
        Back to Login
      </div>
      <div>
        <div className={styles.header}>Sign Up</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SignUpForm
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
