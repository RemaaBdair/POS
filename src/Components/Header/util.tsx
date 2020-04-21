import { navigate } from "@reach/router";
export const logOut = () => {
  localStorage.setItem("LoggedIn", "false");
  navigate("/");
};
