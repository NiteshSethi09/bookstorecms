import { InputHTMLAttributes, FC, memo } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const FormInput: FC<FormInputProps> = ({ className, id, ...rest }) => {
  return (
    <input
      className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 ${className}`}
      {...rest}
    />
  );
};

export default memo(FormInput);
