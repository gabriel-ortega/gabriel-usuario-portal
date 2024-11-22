import React, { useState, useEffect } from "react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { HiCheck, HiOutlineXCircle, HiSelector } from "react-icons/hi";
import { getCountry } from "../../util/services";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/userData";
import { Button } from "flowbite-react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function SelectComponentCountry({
  text,
  classNameSelect,
  onChange,
  name = "country",
  className,
  valueDefault,
  id,
  classnamediv,
  disabled,
  name_valor = false,
  initialValue,
  isValid = true,
  helperText = false,
}) {
  const dispatch = useDispatch();
  const [selectedCountry, setSelectedCountry] = useState({});
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadResults();
  }, []);

  useEffect(() => {
    if (initialValue) {
      setSelectedCountry(initialValue);
    }
  }, [countries]);

  const loadResults = async () => {
    try {
      const countryList = await getCountry();
      setCountries(countryList);
      if (initialValue) {
        setSelectedCountry(initialValue);
      }
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  const handleSelectChange = (newValue, name) => {
    setSelectedCountry(newValue);

    // name_valor es en caso de que le diga al componente que solo quiero el ID
    if (name_valor === false) {
      onChange({ ...newValue, value: newValue.CountryName }, name);
    } else {
      onChange([{ id: newValue.Id, name: newValue.CountryName }]);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.CountryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClear = () => {
    onChange("", name);
    setSelectedCountry({});
  };

  return (
    <>
      <section>
        <Listbox
          value={selectedCountry}
          name={name}
          onChange={(e) => handleSelectChange(e, name)}
        >
          {({ open }) => (
            <>
              <div className={classnamediv}>
                <Label
                  className={`block px-1 text-sm leading-6 ${
                    isValid ? "text-zinc-400" : "text-red-600"
                  }`}
                >
                  {text}
                </Label>
                <div className={`relative ${classNameSelect}`}>
                  <ListboxButton
                    className={`relative w-full h-12 cursor-default rounded-md bg-gray-50 py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ${
                      isValid ? "ring-gray-300" : "ring-red-500"
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6`}
                    disabled={disabled}
                  >
                    <span className="flex items-center">
                      {selectedCountry?.Flag && (
                        <img
                          src={selectedCountry.Flag}
                          alt=""
                          className="h-5 w-5 flex-shrink-0 rounded-full"
                        />
                      )}
                      <span className="ml-3 block truncate">
                        {selectedCountry?.CountryName ||
                          selectedCountry.countryName ||
                          valueDefault}
                      </span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                      <HiSelector
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </ListboxButton>

                  <ListboxOptions className="absolute z-30 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    <div className="flex flex-col-2 pb-1 px-1 gap-1">
                      <input
                        type="text"
                        className=" w-full px-3 py-1 placeholder-gray-400 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md "
                        placeholder="Search Country..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                      />
                      <Button
                        size="xs"
                        className="bg-[#1976d2]"
                        onClick={handleClear}
                      >
                        <HiOutlineXCircle className="h-4 w-4" />
                      </Button>
                    </div>
                    {filteredCountries.map((country) => (
                      <ListboxOption
                        key={country.Id}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "bg-indigo-600 text-white"
                              : "text-gray-900",
                            "relative cursor-default select-none py-2 pl-3 pr-9"
                          )
                        }
                        value={country}
                      >
                        {({ selected, active }) => (
                          <>
                            <div className="flex items-center">
                              <img
                                src={country.Flag}
                                alt=""
                                className="h-5 w-5 flex-shrink-0 rounded-full"
                              />
                              <span
                                className={classNames(
                                  selected ? "font-semibold" : "font-normal",
                                  "ml-3 block truncate"
                                )}
                              >
                                {country.CountryName}
                              </span>
                            </div>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? "text-white" : "text-indigo-600",
                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                )}
                              >
                                <HiCheck
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </div>
            </>
          )}
        </Listbox>
        <section className="">
          <a className={`text-xs text-red-600`}>{isValid ? "" : helperText}</a>
        </section>
      </section>
    </>
  );
}
