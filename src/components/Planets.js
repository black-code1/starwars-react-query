import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Planet from './Planet';


const fetchPlanets = async ( page ) => {
  const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
  console.log(res);
  return res.json();
}


const Planets = () => {
  /* const { data, status } = useQuery(['planets', 'hello, coders', 2], fetchPlanets, { 
    staleTime: 0, 
    //cacheTime: 10,
    onSuccess: () => console.log('data fetched with no problem')
  }); */

  const [ page, setPage ] = useState(1);
  
  const { data, status } = useQuery(['planets', 'hello, ninjas', page], () => fetchPlanets(page), {
    keepPreviousData: true,
  });
 
  return (
    <div>
      <h2>Planets</h2>

      {status === 'loading' && (
        <div>Loading data</div>
      )}

      {status === 'error' && (
        <div>Error fetching data</div>
      )}

      {status === 'success' && (
        <>
          <button
            onClick={() => setPage(old => Math.max(old - 1, 1))}
            disabled={page === 1}
          >
            Previous page
          </button>
          <span>{page}</span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page >= data.count / data.results.length}
          >
            Next page
          </button>
          <div>
            { data.results.map(planet => <Planet key={planet.name} planet={planet} /> ) }
          </div>
        </>
      )} 
    </div>
  );
}
 
export default Planets;