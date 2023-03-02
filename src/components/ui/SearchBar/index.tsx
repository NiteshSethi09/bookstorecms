import { FC } from "react";
import { AiOutlineSearch } from "react-icons/ai";

interface SearchBarProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: FC<SearchBarProps> = ({ setValue, value }) => {
  return (
    <>
      <div className="bg-white pb-4 sm:ml-4">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative mt-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <AiOutlineSearch size={20} className="htext-gray-500" />
          </div>
          <input
            type="text"
            id="table-search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500"
            placeholder="Search for items"
          />
        </div>
      </div>
    </>
  );
};

export default SearchBar;
