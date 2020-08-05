import * as React from "react";
import classes from "./FormField.module.scss";

interface PropTypes {
  title: string;
  type: string;
  required: boolean;
  placeholder: string;
  formData: any;
  setField: (title: string, value: string) => void;
}

const FormField = ({
  title,
  type,
  required,
  placeholder,
  formData,
  setField,
}: PropTypes) => {
  switch (type) {
    case "paragraph": {
      return (
        <textarea
          className={classes.root}
          name={title}
          placeholder={placeholder}
          required={required}
          value={formData[title]}
          onChange={(event) => setField(title, event.target.value)}
        />
      );
    }
    default: {
      return (
        <input
          className={classes.root}
          type={type}
          name={title}
          placeholder={placeholder}
          required={required}
          value={formData[title]}
          onChange={(event) => setField(title, event.target.value)}
        />
      );
    }
  }
};

export default FormField;
