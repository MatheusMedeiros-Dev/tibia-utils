import { Link, NavLink } from "react-router-dom";
import getActiveLinkClass from "../utils/getActiveLinkClass";
import type { AppButtonProps } from "../types/AppButton.types";

const AppButton = ({
  label,
  icon,
  type,
  to,
  buttonStyle,
  onClick,
  error,
}: AppButtonProps) => {
  const renderLabel = () => {
    if (!label) return null;
    if (typeof label === "string") return label;

    return <img src={label.src} alt={label.alt} className="h-8 w-auto" />;
  };

  const baseClasses =
    "text-primary-text rounded-lg mt-1.5 mb-2.5 p-1.5 sm:p-2 sm:px-4 px-3 font-bold";

  const buttonStyleClasses: Record<string, string> = {
    default: `${baseClasses} bg-btn-bg hover:bg-btn-hover transition duration-200`,
    loading: `${baseClasses} bg-btn-hover animate-blink`,
    loadingDelete: `${baseClasses} bg-btn-danger  animate-blink`,
    delete: `${baseClasses} bg-btn-danger hover:bg-btn-danger-hover cursor-pointer`,
    submit: `${baseClasses} bg-btn-bg hover:bg-btn-hover transition duration-200`,
    search:
      "flex items-center justify-center h-[26px] w-[34px] sm:h-[30px]  sm:w-[38px] text-primary-text bg-btn-search-bg hover:bg-search-hover-bg transition duration-300 rounded-md cursor-pointer",
    login: "flex rounded-sm text-inherit font-medium",
    logout:
      "flex cursor-pointer hover:bg-btn-danger rounded-sm px-2 transition duration-300 font-medium",
    navbar: "flex rounded-sm text-inherit ml-2 font-medium",
    backbar:
      "inline-flex text-primary-text rounded-lg m-2 p-1.5 px-3 font-bold bg-btn-bg hover:bg-btn-hover transition duration-200",
    withoutStyle: "",
  };

  const finalClass = buttonStyle
    ? buttonStyleClasses[buttonStyle]
    : buttonStyleClasses.default;

  if (type === "button") {
    return (
      <>
        {typeof error === "string" && error.trim() !== "" && (
          <p className="p-3 w-auto my-2 mb-0 bg-error-bg rounded-sm text-error-text font-semibold">
            {error}
          </p>
        )}
        <button
          className={finalClass}
          onClick={onClick}
          disabled={buttonStyle === "loadingDelete"}
        >
          {icon}
          {renderLabel()}
        </button>
      </>
    );
  }

  if (type === "submit") {
    if (typeof label !== "string") {
      return null;
    }

    return (
      <>
        {/* Mensagem de erro exibida acima do botão de submit caso algum campo for preenchido incorretamente */}
        {typeof error === "string" && error.trim() !== "" && (
          <p className="p-3 w-auto my-2 mb-0 bg-error-bg rounded-sm text-error-text font-semibold">
            {error}
          </p>
        )}

        <div className="flex justify-center">
          <input
            type="submit"
            disabled={buttonStyle === "loading"}
            value={label}
            className={finalClass}
          />
        </div>
      </>
    );
  }

  if (type === "link") {
    if (!to) {
      return null;
    }
    return (
      <Link to={to} className={finalClass}>
        {renderLabel()}
      </Link>
    );
  }

  if (type === "navlink") {
    if (!to) {
      return null;
    }
    return (
      <li>
        <NavLink
          to={to}
          className={({ isActive }) =>
            `${getActiveLinkClass({
              isActive,
            })} ${finalClass}`
          }
        >
          {renderLabel()}
        </NavLink>
      </li>
    );
  }
};

export default AppButton;
