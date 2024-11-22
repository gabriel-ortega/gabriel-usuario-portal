import {
  HiOutlineSortAscending,
  HiOutlineSortDescending,
  HiOutlineSwitchVertical,
} from "react-icons/hi";
import { formatHeader, formatTitleCase } from "../../util/helperFunctions";
import { useState } from "react";
import { useEffect } from "react";

export function TableComponent({
  items,
  headers = ["--", "--", "--", "--", "--"],
  handleEdite,
  handleDelet,
  isProfileComponent = false,
  disabled = false,
  buttonEditDelete = true,
  enumaration = true,
  sorting = false,
  setSortedData = () => {},
}) {
  const extractSortableValue = (item, column) => {
    // const currentItem = isProfileComponent ? item.data ?? {} : item;
    const currentItem = item;

    if (Array.isArray(currentItem[column])) {
      return currentItem[column]
        .map((subItem) =>
          subItem.value !== undefined ? subItem.value : subItem.name
        )
        .join(", ");
    } else if (
      typeof currentItem[column] === "object" &&
      currentItem[column] !== null
    ) {
      return currentItem[column].value || currentItem[column].name || "";
    } else {
      return currentItem[column] || "";
    }
  };

  const [sortedItems, setSortedItems] = useState([]);

  const [headerSorting, setHeaderSorting] = useState({
    column: null, // Nombre de la columna en ordenación
    isAscending: true, // true para ascendente, false para descendente
  });
  useEffect(() => {
    setSortedItems(items);
  }, [items]);

  // const mappedHeaders = headers.map((header) => header.replace(/ /g, ""));
  const mappedHeaders = headers.map((header) => formatHeader(header));

  const handleEdit = (value, e) => {
    e.preventDefault();
    handleEdite(value);
  };
  const handleDelete = (value, e) => {
    e.preventDefault();
    handleDelet(value);
  };

  // Función para manejar el cambio de ordenación
  const handleSort = (column) => {
    const columName = formatHeader(column);
    const isAscending =
      headerSorting.column === column ? !headerSorting.isAscending : true;

    const sorted = [...sortedItems].sort((a, b) => {
      const valueA = extractSortableValue(
        isProfileComponent ? a.data : a,
        columName
      );
      const valueB = extractSortableValue(
        isProfileComponent ? b.data : b,
        columName
      );

      if (valueA < valueB) return isAscending ? -1 : 1;
      if (valueA > valueB) return isAscending ? 1 : -1;
      return 0;
    });
    setSortedItems(sorted);
    setSortedData(sorted);
    setHeaderSorting({ column, isAscending });
    // setHeaderSortingName({ column, isAscendingName });
  };

  return (
    <div className="overflow-x-auto p-4 w-full max-w-full">
      <table className="table-auto min-w-full border-collapse border-b border-black">
        <thead>
          <tr>
            {enumaration && (
              <th className="py-2 border-b text-sm text-black">No</th>
            )}
            {headers.map((header, index) => (
              <th
                key={index}
                className="py-2 px-4 border-b text-sm text-black"
                onClick={() => handleSort(header)} // Pasa el nombre de la columna
              >
                <div
                  className={`flex flex-row items-center justify-between space-x-2 ${"hover:cursor-pointer"}`}
                >
                  <span className="truncate">{header}</span>

                  {/* Icono de orden, cambia basado en el estado */}
                  {sorting &&
                    (headerSorting.column === header ? (
                      headerSorting.isAscending ? (
                        <HiOutlineSortAscending className="w-5 h-5 text-gray-500" />
                      ) : (
                        <HiOutlineSortDescending className="w-5 h-5 text-gray-500" />
                      )
                    ) : (
                      <HiOutlineSwitchVertical className="w-5 h-5 text-gray-300" /> // Ícono general para indicar que es ordenable
                    ))}
                </div>
              </th>
            ))}
            {!disabled && !buttonEditDelete ? null : (
              <>
                {/* <th className="py-2 px-4 border-b text-sm text-black w-10">
                  Edit
                </th> */}
                <th className="py-2 px-4 border-b text-sm text-black w-10">
                  Delete
                </th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {sortedItems && sortedItems.length > 0 ? (
            sortedItems.map((item, index) => {
              // Definir la fuente de datos dependiendo de isProfileComponent y hacer fail-safe para data
              const currentItem = isProfileComponent ? item.data ?? {} : item;

              return (
                <tr
                  key={index}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-zinc-50"
                >
                  {enumaration && (
                    <td
                      className={`py-2 px-4 w-6 border-b text-center ${
                        disabled ? "opacity-50" : ""
                      }`}
                    >
                      {index + 1}
                    </td>
                  )}

                  {mappedHeaders.map((header, idx) => (
                    <td
                      key={idx}
                      className={`py-2 w-12 border-b text-sm text-center text-black hover:cursor-pointer ${
                        disabled ? "opacity-50" : ""
                      }`}
                      onClick={(e) => handleEdit(index, e)}
                    >
                      {Array.isArray(currentItem[header])
                        ? currentItem[header]
                            .map((subItem) =>
                              subItem.value !== undefined
                                ? subItem.value
                                : subItem.name
                            )
                            .join(", ")
                        : typeof currentItem[header] === "object" &&
                          currentItem[header] !== null
                        ? currentItem[header].value !== undefined
                          ? currentItem[header].value
                          : currentItem[header].name !== undefined
                          ? currentItem[header].name
                          : ""
                        : currentItem[header] || "-"}
                    </td>
                  ))}
                  {!disabled && !buttonEditDelete ? null : (
                    <>
                      {/* <td className="py-2 px-4 border-b text-center">
                        <button
                          className="p-2 bg-green-700 text-white rounded"
                          onClick={(e) => handleEdit(index, e)}
                        >
                          Edit
                        </button>
                      </td> */}
                      <td className="py-2 px-4 w-6 border-b text-center">
                        <button
                          className="p-2 bg-red-700 text-white rounded"
                          onClick={(e) => handleDelete(index, e)}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              );
            })
          ) : (
            <tr className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <td
                colSpan={headers.length + 3}
                className="py-2 px-4 border-b text-center"
              >
                No Data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
