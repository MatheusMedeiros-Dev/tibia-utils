interface LineDividerProps {
  direction?: "vertical" | "horizontal";
}

const LineDivider = ({ direction }: LineDividerProps) => {
  const baseDirectionClasses = "border-t border-secondary-divider";

  const directionClasses = {
    vertical: "my-1 mx-2 border-r border-primary-divider",
    horizontal: "mx-1.5 border-t border-secondary-divider",
  };

  const finalClass = direction
    ? directionClasses[direction]
    : baseDirectionClasses;

  return <div className={finalClass}></div>;
};
export default LineDivider;
