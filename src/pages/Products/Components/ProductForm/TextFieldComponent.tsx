import React from "react";
import MuiTextField from "@material-ui/core/TextField";
import { fieldToTextField, TextFieldProps } from "formik-material-ui";
function UpperCasingTextField(props: TextFieldProps) {
  const {
    form: { setFieldValue },
    field: { name },
  } = props;
  const onChange = React.useCallback(
    (event) => {
      const { value } = event.target;
      setFieldValue(name, value ? value : "");
    },
    [setFieldValue, name]
  );
  return <MuiTextField {...fieldToTextField(props)} onChange={onChange} />;
}
export default UpperCasingTextField;
