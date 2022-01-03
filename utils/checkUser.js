import { Auth } from "aws-amplify";

export default async function CheckUser() {
  try {
    await Auth.currentAuthenticatedUser();
    return true;
  } catch {
    return false;
  }
}
