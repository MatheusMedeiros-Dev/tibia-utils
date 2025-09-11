interface FormLayoutProps {
  title: string;
  formStyle?: string;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}
const FormLayout = ({
  title,
  formStyle,
  onSubmit,
  children,
}: FormLayoutProps) => {
  const baseClasses = `w-full sm:w-100 mb-2 bg-overlay-bg shadow-lg text-primary-text `;
  const formStyleClass: Record<string, string> = {
    default: `${baseClasses} rounded-b-xl`,
    withBackBar: `${baseClasses} rounded-xl`,
    wasteDivisor:
      "w-full sm:w-100  mb-2 bg-overlay-bg shadow-lg text-primary-text sm:rounded-b-xl rounded-xl",
  };
  const finalClass = formStyle
    ? formStyleClass[formStyle]
    : formStyleClass.default;
  return (
    <div className={finalClass}>
      <form onSubmit={onSubmit} className="m-4 mb-0">
        <h1 className="text-center font-bold text-lg p-2 bg-card-bg rounded-md shadow-md mb-4">
          {title}
        </h1>
        {children}
      </form>
    </div>
  );
};

export default FormLayout;
