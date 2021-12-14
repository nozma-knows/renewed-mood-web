import { AiFillEye } from "react-icons/ai";
import styles from "../styles/FormInput.module.css";

const matchAll = /[\s\S]*/;
export default function FormInput({
  className,
  placeholder,
  register,
  type,
  error,
}) {
  console.log(`Error for ${type}`, error);

  return (
    <div className={styles.container}>
      <input
        className={className}
        id={type}
        type={type}
        placeholder={placeholder}
        {...register(type)}
      />
      {error ? (
        <div className={styles.error}>{error.message}</div>
      ) : (
        <div className={styles.error}></div>
      )}
    </div>
  );
}
