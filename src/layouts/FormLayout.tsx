interface FormLayoutProps {
  mode?: "withBar" | "default";
  title: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}
const FormLayout = ({
  mode = "default",
  title,
  onSubmit,
  children,
}: FormLayoutProps) => {
  const baseClasses = `w-full sm:w-1/3 bg-overlay-bg shadow-lg text-primary-text mb-2`;
  const finalClass =
    mode === "default"
      ? `${baseClasses} rounded-b-xl`
      : `${baseClasses} rounded-xl`;
  return (
    <div className="flex justify-center">
      <div className={finalClass}>
        <form onSubmit={onSubmit} className="flex flex-col m-4 mb-0">
          <h1 className="text-center font-bold text-lg p-2 bg-card-bg rounded-md shadow-md mb-4">
            {title}
          </h1>
          {children}
        </form>
      </div>
    </div>
  );
};

export default FormLayout;
