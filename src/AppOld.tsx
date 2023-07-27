import { useEffect, useReducer, useState } from 'react'
import './App.css'

const getRandomNumberFromApi = async():Promise<number> => {
  const res = await fetch(
    "https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new"
  );

  const numberString = await res.text();
  return +numberString
}

export const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [number, setNumber] = useState<number>()
  const [error, setError] = useState<string>()
  const [key, forceRefetch] = useReducer((x) => x+1, 0 )

  useEffect(() => {
    setIsLoading(true)
    getRandomNumberFromApi()
    .then( setNumber)
    .catch( error => setError( error.message))
  }, [key])



  useEffect(() => {
    if (number) setIsLoading(false);
  }, [number]);
  

    useEffect(() => {
      if (error) setIsLoading(false);
    }, [error]);
  

  return (
    <div className="App">
      { 
      isLoading 
        ? (<h2>Loading ...</h2>)
        : !error && (<h2>Random Number: {number}</h2>)
      }

      {
        !isLoading && error && (<h3>{error}</h3>)
      }

      <button onClick={ forceRefetch} disabled={ isLoading}>
        {
          isLoading ? '...' : 'New Number'
        }
      </button>
    </div>
  )
}

