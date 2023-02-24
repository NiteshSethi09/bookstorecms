import { SelectHTMLAttributes, FC } from "react";

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  optionList?: string[];
}
const FormSelect: FC<FormSelectProps> = ({
  optionList,
  className,
  ...rest
}) => {
  return (
    <>
      <select
        className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 ${
          className ?? ""
        }`}
        {...rest}
      >
        {optionList?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};

export default FormSelect;
