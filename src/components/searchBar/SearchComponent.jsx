import {
  Hits,
  InstantSearch,
  SearchBox,
  Configure,
  Highlight,
} from "react-instantsearch";
import { CustomSearchBox } from "./CustomSearchBox";
import { CustomHits } from "./CustomHits";
// import { Hit } from "./Hit";

export const SearchComponent = () => {
  return (
    <>
      <Configure
      // hitsPerPage={10}
      />
      <div className="">
        <CustomSearchBox />
      </div>
      <CustomHits />
    </>
  );
};
