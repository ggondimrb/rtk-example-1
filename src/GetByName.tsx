import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useGetPokemonByNameQuery } from "./api/api"
import { decrement, increment, incrementByAmount } from "./counterSlice"
import { useGetCharacterByFiltersQuery } from "./api/rickMortyApi"
import { RootState } from "./store"

export function GetByName() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('male');
  const { isLoading, error, data, } = useGetCharacterByFiltersQuery({ name, gender });

  return (
    <div>
      <span>Name</span>
      <input onChange={(e) => setName(e.target.value)} />

      <span>Gender</span>
      <select onChange={(e) => setGender(e.target.value)}>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="genderless">Genderless</option>
        <option value="unknown">unknown</option>
      </select>
      {
        isLoading ?
          <h1>Carregando...</h1>
          : error ?
            (<h1>Nenhum personagem encontrado</h1>)
            :
            data?.results.map((item) => {
              return (
                <div key={item.id}>
                  <h1>{item?.name}</h1>
                  <img src={item?.image} alt={item?.name} />
                </div>
              )
            })
      }
    </div>
  )
}