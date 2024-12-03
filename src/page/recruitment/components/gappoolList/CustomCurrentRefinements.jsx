import { useEffect } from "react";
import { useCurrentRefinements } from "react-instantsearch";
import { IoIosClose } from "react-icons/io";

export function CustomCurrentRefinements(props) {
  const { items, refine } = useCurrentRefinements(props);
  useEffect(() => {
    // console.log(items);
  }, [items]);

  return (
    <ul>
      {items.map((item) => (
        <li
          key={[item.indexName, item.label].join("/")}
          className="flex flex-row gap-2 text-sm my-1 items-center"
        >
          <span className="font-light italic">
            {item.label.toUpperCase()}:{" "}
          </span>
          {item.refinements.map((refinement) => (
            <span
              key={refinement.label}
              className="border rounded-md flex pl-2 flex-row gap-3 items-center"
            >
              <span>{refinement.label}</span>
              <button
                className="flex items-center justify-center border-l border-zinc-400"
                type="button"
                onClick={(event) => {
                  if (isModifierClick(event)) {
                    return;
                  }

                  refine(refinement);
                }}
              >
                <IoIosClose />
              </button>
            </span>
          ))}
        </li>
      ))}
    </ul>
  );
}

function isModifierClick(event) {
  const isMiddleClick = event.button === 1;

  return Boolean(
    isMiddleClick ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey
  );
}
