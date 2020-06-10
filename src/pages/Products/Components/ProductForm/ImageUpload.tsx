import React from "react";
import { useField } from "formik";
import { MyButton } from "../../../../Components/Button/Button";
interface ImageUploadProps {
  label: string;
  name: string;
}
const ImageUpload: React.FunctionComponent<ImageUploadProps> = ({
  label,
  ...props
}) => {
  const [field, meta, helpers] = useField<string>(props.name);
  const { setValue } = helpers;
  const handleImageUpload = (event: any) => {
    const data = new FormData();
    data.append(
      "source",
      event.target.files[0],
      `${event.target.value.name}`
    );
    data.append("action", "upload");
    data.append("type", "file");
    const requestOptions = {
      method: "POST",
      body: data,
    };
    fetch(`https://imgbb.com/json`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const obj = JSON.parse(result);
        setValue(obj.image.image.url);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  return (
    <>
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="image-button"
        multiple
        type="file"
        name="image"
        onChange={(event) => {
          handleImageUpload(event);
        }}
      />
      <label htmlFor="image-button">
        <MyButton component="span" variant="outlined" fullWidth={false}>
          {label}
        </MyButton>
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};
export default ImageUpload;
