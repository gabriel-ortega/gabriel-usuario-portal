import { useEffect } from "react";
import { useCurrentRefinements } from "react-instantsearch";

export function CustomCurrentRefinements(props) {
  const { items, refine } = useCurrentRefinements(props);
  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <ul>
      {items.map((item) => (
        <li key={[item.indexName, item.label].join("/")}>
          <span>{item.label}:</span>
          {item.refinements.map((refinement) => (
            <span key={refinement.label}>
              <span>{refinement.label}</span>
              <button
                type="button"
                onClick={(event) => {
                  if (isModifierClick(event)) {
                    return;
                  }

                  refine(refinement);
                }}
              >
                Remove
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
