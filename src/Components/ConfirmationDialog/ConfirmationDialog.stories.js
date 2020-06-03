import React from "react";
import ConfirmationDialog from "./ConfirmationDialog";

export default {
  title: "Dialogs",
};

export const confirmationDialog = () => (
  <ConfirmationDialog
    openDialog={true}
    message="Your data will be lost, Are you sure you want to cancel?"
  />
);
