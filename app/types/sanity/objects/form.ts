import { FormFieldType } from "./formField";

export interface FormType {
  _id: string;
  heading?: string;
  subtitle?: string;
  fields: FormFieldType[];
}
