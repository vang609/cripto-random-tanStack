import './App.css'
import { useRandom } from './hooks/useRandom';



export const App = () => {
 
  const query = useRandom()

  return (
    <div className="App">
      {query.isFetching ? (
        <h2>Loading ...</h2>
      ) : (
        <h2>Random Number: {query.data}</h2>
      )}

      {!query.isLoading && query.isError && <h3>{`${query.error}`}</h3>}

      <button onClick={() => query.refetch()} disabled={query.isFetching}>
        {query.isFetching ? "..." : "New Number"}
      </button>
    </div>
  );
}

