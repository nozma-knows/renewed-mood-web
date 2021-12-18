import Layout from "../components/layout";
import "../styles/globals.css";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../src/aws-exports";
Amplify.configure(awsconfig);

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
