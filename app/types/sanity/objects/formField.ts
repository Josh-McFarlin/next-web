export interface FormFieldType {
  _id: string;
  title: string;
  type:
    | "text"
    | "paragraph"
    | "email"
    | "tel"
    | "date"
    | "time"
    | "datetime-local"
    | "file";
  required: boolean;
  placeholder?: string;
}
