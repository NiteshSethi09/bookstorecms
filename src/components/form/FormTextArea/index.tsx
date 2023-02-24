import { TextareaHTMLAttributes, FC, memo } from "react";

interface FormTextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const FormTextArea: FC<FormTextAreaProps> = ({ className, id, ...rest }) => {
  return (
    <>
      <textarea
        className={`block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 ${className}`}
        rows={4}
        {...rest}
      />
    </>
  );
};

export default memo(FormTextArea);
