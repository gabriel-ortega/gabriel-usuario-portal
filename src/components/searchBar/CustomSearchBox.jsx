import React, { useState, useRef } from "react";
import { useInstantSearch, useSearchBox } from "react-instantsearch";
import { InputText } from "../layoutComponents";
import { MdOutlineSearch } from "react-icons/md";
import { HiXCircle } from "react-icons/hi";

export function CustomSearchBox({ onInputChange = () => {}, ...props }) {
  const { query, refine } = useSearchBox(props);
  const { status } = useInstantSearch();
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef(null);

  const isSearchStalled = status === "stalled";

  function setQuery(newQuery) {
    setInputValue(newQuery);
    refine(newQuery);
    onInputChange(newQuery);
  }

  return (
    <form
      className="flex flex-col md:flex-row gap-2 items-center w-full md:w-1/2"
      onSubmit={(event) => {
        event.preventDefault();
        inputRef.current && inputRef.current.blur();
      }}
      onReset={(event) => {
        event.preventDefault();
        setInputValue("");
        setQuery("");
        inputRef.current && inputRef.current.focus();
      }}
    >
      <input
        ref={inputRef}
        type="search"
        value={inputValue}
        onChange={(event) => setQuery(event.currentTarget.value)}
        className="border rounded-md  h-8 p-2 focus:border-blue-500"
        placeholder="Global Search..."
      />
      <div className="flex flex-row gap-3 items-center">
        <button
          type="submit"
          className={`${
            props.isNav ? "hidden" : ""
          } whitespace-nowrap border border-[#010064] bg-[#010064] text-white w-10 md:w-32 h-8 flex justify-center items-center rounded-lg text-sm hover:bg-[#262550]`}
        >
          <MdOutlineSearch className="w-6 h-5" />
          <span className="hidden md:block">Search</span>
        </button>
        <button
          type="submit"
          className={`${props.isNav ? "" : "hidden"} text-white cursor-pointer`}
        >
          <MdOutlineSearch className={`w-6 h-5 `} />
        </button>
        <button
          hidden={inputValue.length === 0 || isSearchStalled || props.isNav}
          type="reset"
          className={`${
            inputValue.length === 0 || isSearchStalled || props.isNav
              ? "hidden"
              : ""
          } border border-red-600 bg-red-600 text-white w-10 md:w-32 h-8 flex justify-center items-center rounded-lg text-sm hover:bg-red-700`}
        >
          <HiXCircle className="h-4 w-4" />
          <span className="hidden md:block">Clear</span>
        </button>
        <button
          type="reset"
          className={`${
            props.isNav && inputValue.length > 0 && !isSearchStalled
              ? ""
              : "hidden"
          } text-white cursor-pointer`}
        >
          <HiXCircle className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
