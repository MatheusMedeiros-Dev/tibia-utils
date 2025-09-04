import AppButton from "./AppButton";

interface BackButtonBarProps {
  to: string;
  width?: string;
}

const BackButtonBar = ({ to, width = "w-2/3" }: BackButtonBarProps) => {
  return (
    <div className="flex justify-center">
      <div className={`w-full sm:${width} bg-overlay-bg mb-2 rounded-b-lg`}>
        <AppButton type="link" label="Voltar" to={to} buttonStyle="backbar" />
      </div>
    </div>
  );
};

export default BackButtonBar;
