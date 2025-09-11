import AppButton from "./AppButton";

interface BackButtonBarProps {
  to: string;
  backBarStyle?: "toPost";
}

const BackButtonBar = ({ to, backBarStyle }: BackButtonBarProps) => {
  const backBarStyleClasses = {
    default: "w-full sm:w-100 bg-overlay-bg mb-2 rounded-b-lg",
    toPost: "w-full sm:w-2/3 bg-overlay-bg mb-2 rounded-b-lg",
  };

  const finalClasse = backBarStyle
    ? backBarStyleClasses[backBarStyle]
    : backBarStyleClasses.default;

  return (
    <div className="flex justify-center">
      <div className={finalClasse}>
        <AppButton type="link" label="Voltar" to={to} buttonStyle="backbar" />
      </div>
    </div>
  );
};

export default BackButtonBar;
