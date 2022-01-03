import Head from "next/head";
import { useRouter } from "next/router";
import { Auth } from "aws-amplify";

async function handleSignOut(router) {
  try {
    await Auth.signOut({ global: true });
    router.push("/");
  } catch (err) {
    console.log("Error signing out: ", err);
  }
}

export default function Profile() {
  const router = useRouter(); // Used to redirect to different page in web app

  return (
    <>
      <Head>
        <title>Renewed Mood | Profile</title>
      </Head>
      <div>
        <h1>Profile</h1>
        <button onClick={() => handleSignOut(router)}>Sign Out</button>
      </div>
    </>
  );
}
