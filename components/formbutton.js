import styles from "../styles/FormButton.module.css";

export default function FormButton({
  className,
  type,
  value,
  isDirty,
  isValid,
}) {
  return (
    <input
      className={className}
      style={!isDirty || !isValid ? { opacity: "50%" } : { cursor: "pointer" }}
      type={type}
      value={value}
      disabled={!isDirty || !isValid}
    />
  );
}
