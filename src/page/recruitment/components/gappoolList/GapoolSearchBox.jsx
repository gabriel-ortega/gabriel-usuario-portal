import React, { useState, useRef } from "react";
import { useInstantSearch, useSearchBox } from "react-instantsearch";
import { InputText } from "../../../../components/layoutComponents";
import { MdOutlineSearch } from "react-icons/md";
import { HiXCircle } from "react-icons/hi";

export function GapoolSearchBox({ onInputChange = () => {}, ...props }) {
  const { query, refine } = useSearchBox(props);
  const { status } = useInstantSearch();
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef(null);

  const isSearchStalled = status === "stalled";

  function setQuery(newQuery) {
    setInputValue(newQuery);
    refine(newQuery);
    // onInputChange(newQuery);
  }

  return (
    <form
      className="w-full"
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
        placeholder="Search..."
      />
    </form>
  );
}
