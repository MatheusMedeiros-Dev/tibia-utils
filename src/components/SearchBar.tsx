import { type FormEvent } from "react";
import { FaSearch } from "react-icons/fa";
import InputField from "./InputField";
import AppButton from "./AppButton";

interface SearchBarProps {
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  inputValue: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const SearchBar = ({ onSubmit, inputValue, onChange }: SearchBarProps) => {
  return (
    <div className="flex mb-2 w-full sm:w-2/3 justify-center items-center bg-overlay-bg rounded-b-lg">
      <form onSubmit={onSubmit} className="flex justify-center">
        <div className="flex items-center h-[26px] m-3 mr-1">
          <div className="flex">
            <InputField
              inputStyle="search"
              name="query"
              value={inputValue}
              placeholder="Buscar por tags"
              onChange={onChange}
            />
          </div>
          <div className="flex">
            <AppButton type="button" icon={<FaSearch />} buttonStyle="search" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
