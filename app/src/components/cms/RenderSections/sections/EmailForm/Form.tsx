import * as React from "react";
import FormField from "./FormField";
import classes from "./Form.module.scss";

interface PropTypes {
  name: string;
  heading?: string;
  subtitle?: string;
  fields: {
    _key: string;
    title: string;
    type: string;
    required: boolean;
    placeholder: string;
  }[];
}

interface GenericObject {
  [key: string]: string;
}

const encode = (data: any) =>
  Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");

const Form = ({ name, heading, subtitle, fields }: PropTypes) => {
  const [formData, setFormData] = React.useState<GenericObject>({
    "form-name": name,
    ...fields.reduce(
      (accum: GenericObject, curValue) => ((accum[curValue.title] = ""), accum),
      {}
    ),
  });

  const setField = (name: string, value: string) => {
    setFormData((prevData) => {
      const dataCopy = { ...prevData };

      dataCopy[name] = value;

      return dataCopy;
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    await fetch("/", {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: encode(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        alert("Successfully submitted form!");
      })
      .catch(() => {
        alert(
          "An error occurred while submitting the form, please try again later!"
        );
      });
  };

  return (
    <section className={classes.root}>
      <div className={classes.container}>
        {heading && <h2 className={classes.heading}>{heading}</h2>}
        {subtitle && <p className={classes.subtitle}>{subtitle}</p>}
        <form
          name={name}
          method="POST"
          netlify-honeypot="bot-field"
          data-netlify="true"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value={name} />
          <p className={classes.hiddenField}>
            <label>
              {"Don’t fill this out if you're human: "}
              <input name="bot-field" />
            </label>
          </p>

          {fields.map((field) => (
            <label key={field._key}>
              {field.title}
              <FormField {...field} formData={formData} setField={setField} />
            </label>
          ))}

          <input className={classes.formButton} type="submit" value="Send" />
        </form>
      </div>
    </section>
  );
};

export default Form;
