import Link from "next/link";
// import { useEffect } from "react";
// import { useRouter } from "next/router";

export default function NotFound() {
  // const router = useRouter();

  // useEffect(() => {
  //   setTimeout(() => {
  //     router.push("/");
  //   }, 1000);
  // }, []);

  return (
    <div className="not-found">
      <h1>Oooops...</h1>
      <h2>This page cannot be found.</h2>
      <p>
        Go back to the{" "}
        <Link href="/">
          <a>Homepage</a>
        </Link>
      </p>
    </div>
  );
}
