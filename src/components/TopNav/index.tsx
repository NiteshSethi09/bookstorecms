import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface TopNavProps {
  title?: string;
  buttonComponent?: JSX.Element;
}
const TopNav: FC<TopNavProps> = ({ title, buttonComponent }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="mx-0 mb-8 flex justify-between sm:ml-4">
        <div>
          <p
            className="flex cursor-pointer items-center "
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} /> Back
          </p>
          <p className="text-2xl font-medium">{title ?? "Create an entry"}</p>
        </div>
        <div>{buttonComponent}</div>
      </div>
    </>
  );
};

export default TopNav;
