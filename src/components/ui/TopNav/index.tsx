import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";
import Button from "../Button";

interface TopNavProps {
  title?: string;
  onClickHandler?: () => void;
}
const TopNav: FC<TopNavProps> = ({ title, onClickHandler }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="mx-0 mb-8 flex justify-between sm:ml-4">
        <div>
          <p
            className="flex cursor-pointer items-center "
            onClick={() => navigate(-1)}
          >
            <BsArrowLeftShort size={25} /> Back
          </p>
          <p className="text-2xl font-medium">{title ?? "Create an entry"}</p>
        </div>
        <div>
          <Button
            onClick={onClickHandler}
            className="border bg-blue-600 text-white"
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
};

export default TopNav;
