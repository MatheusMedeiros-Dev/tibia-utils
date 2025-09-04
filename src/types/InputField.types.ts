type inputStyle = "text" | "textarea" | "email" | "password";

type InputStyle = "default" | "search";

type AutoCompleteOption =
  | "name"
  | "email"
  | "username"
  | "current-password"
  | "new-password";

export interface InputFieldProps {
  label?: string;
  type?: inputStyle;
  inputStyle?: InputStyle;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  required?: boolean;
  autoComplete?: AutoCompleteOption;
}
