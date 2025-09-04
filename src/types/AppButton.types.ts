type ImageProps = {
  src: string;
  alt: string;
};
type buttonStyle = "button" | "submit" | "link" | "navlink";

type ButtonStyle =
  | "default"
  | "loading"
  | "loadingDelete"
  | "delete"
  | "search"
  | "submit"
  | "login"
  | "logout"
  | "withoutStyle"
  | "navbar"
  | "backbar";

export interface AppButtonProps {
  label?: string | ImageProps;
  icon?: React.ReactNode;
  type: buttonStyle;
  buttonStyle?: ButtonStyle; // define o tipo de estilo do botão
  to?: string; // rota para links e navlinks
  onClick?: () => void;
  error?: string | null; // mensagem de erro para os submits
}
