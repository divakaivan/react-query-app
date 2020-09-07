import React, { useState } from "react";
import { usePaginatedQuery } from "react-query";
import Planet from "./Planet";

const fetchPlanets = async (_, page) => {
  const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);

  const { resolvedData, latestData, status } = usePaginatedQuery(
    ["planets", page],
    fetchPlanets
  );
  /* as third argument to useQuery: {
    staleTime: 0,
    onSuccess: () => console.log("data fetched YAY"),
    // custom configurations
    }
  */

  return (
    <div>
      <h2>Planets</h2>

      {status === "loading" ? <div>Loading data</div> : null}
      {status === "error" ? <div>Error fetching data</div> : null}
      {status === "success" ? (
        <>
          <button
            disabled={page === 1}
            onClick={() => setPage((oldPage) => Math.max(oldPage - 1, 1))}
          >
            Previous page
          </button>
          <span>{page}</span>
          <button
            disabled={!latestData || !latestData.next}
            onClick={() =>
              setPage((oldPage) =>
                !latestData || !latestData.next ? oldPage : oldPage + 1
              )
            }
          >
            Next page
          </button>
          <div>
            {resolvedData.results.map((planet) => (
              <Planet key={planet.name} planet={planet} />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Planets;
