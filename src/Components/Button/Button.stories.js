import React from "react";
import { MyButton } from "./Button";
import { withKnobs, text, color } from "@storybook/addon-knobs";
export default {
  title: "Button",
  decorators: [withKnobs],
};

export const LogInButton = () => {
  return (
    <MyButton variant="contained" size="large">
      {text("Label", "LogIn")}
    </MyButton>
  );
};
