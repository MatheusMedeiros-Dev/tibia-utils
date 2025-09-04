import type { InputFieldProps } from "../types/InputField.types";

const InputField = ({
  label,
  type = "text",
  inputStyle,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  autoComplete,
}: InputFieldProps) => {
  const inputStyleClasses: Record<string, string> = {
    default:
      "flex bg-input-bg text-primary-text p-1 w-full sm:w-2/3 mb-1 placeholder-input-placeholder indent-1 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400",
    search:
      "bg-content-bg h-[26px] sm:h-[30px] w-[300px] mr-[4px] focus:outline-none border border-input-border rounded-md focus:outline-none indent-1 focus:ring-2 focus:ring-cyan-400",
  };

  const finalClass = inputStyle
    ? inputStyleClasses[inputStyle]
    : inputStyleClasses.default;
  return (
    <label>
      {label && (
        <span className="block font-semibold text-input-label">{label}</span>
      )}
      {type === "textarea" ? (
        <textarea
          className={finalClass}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
        />
      ) : (
        <input
          className={finalClass}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
        />
      )}
    </label>
  );
};

export default InputField;
