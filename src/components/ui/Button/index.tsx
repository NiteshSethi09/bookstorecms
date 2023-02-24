import { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}
const Button: FC<ButtonProps> = ({ className, children, ...rest }) => {
  return (
    <>
      <button
        type="button"
        className={`rounded border px-5 py-2.5 text-center text-sm font-medium focus:outline-none ${className}`}
        {...rest}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
