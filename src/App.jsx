import { createBrowserRouter } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";
import { createRoutesFromElements } from "react-router-dom";
import { Route } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { InstantSearch } from "react-instantsearch";
import { algoliasearch } from "algoliasearch";
const router = createBrowserRouter(
  createRoutesFromElements(<Route path="*" element={<AppRouter />} />)
);
const searchClient = algoliasearch(
  import.meta.env.VITE_ALGOLIA_ID,
  import.meta.env.VITE_ALGOLIA_KEY
);

export default function App() {
  return (
    <InstantSearch searchClient={searchClient} indexName="globalSearch">
      <RouterProvider router={router} />
    </InstantSearch>
  );
}
