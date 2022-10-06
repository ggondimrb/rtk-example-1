import { useState } from "react"
import { useGetPokemonByNameQuery } from "./api/api"
import { decrement, increment, incrementByAmount } from "./app/counterSlice"
import { useGetCharacterByIdQuery } from "./api/rickMortyApi"
import { RootState } from "./app/store"
import { useAppDispatch, useAppSelector } from "./app/hooks"

function App() {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  const [name, setName] = useState('');

  const [id, setId] = useState(1);
  const { data, isLoading, error } = useGetCharacterByIdQuery(id);

  return (
    <div>
      <input onChange={(e) => setId(Number(e.target.value))} />
      {
        isLoading ?
          <h1>Carregando...</h1>
          : error ?
            (<h1> Nenhum personagem encontrado</h1>)
            :
            <div>
              <h1>{data?.name}</h1>
              <img src={data?.image} alt={data?.name} />
            </div>
      }
    </div>
  )
}

export default App