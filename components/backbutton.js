import { useRouter } from "next/router";
import { AiFillCaretLeft } from "react-icons/ai";
import styles from "../styles/BackButton.module.css";
export default function BackButton({ push, value }) {
  const router = useRouter();

  return (
    <div className={styles.back} onClick={() => router.push(`/${push}`)}>
      <AiFillCaretLeft className={styles.backCarrot} />
      {value}
    </div>
  );
}
