import React from "react";
import { MyTextField } from "./TextField";

export default {
  title: "TextField",
};

export const NormalTextField = () => (
  <MyTextField labelName="Email" type="text" />
);
export const PasswordTextField = () => (
  <MyTextField labelName="Password" type="password" />
);
