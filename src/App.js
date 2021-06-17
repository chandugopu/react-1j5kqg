import React, { useState, useEffect } from 'react';
import './style.css';

export default function App() {
  const [offset, setOffset] = useState(1);
  const [responses, setResponses] = useState([]);
  const getData = index => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${index}`).then(res =>
      res.json()
    );
  };
  const get3Pokemons = index => {
    Promise.all([getData(index), getData(index + 1), getData(index + 2)]).then(
      res => {
        console.log(
          res.map(({ name, sprites: { front_default } ,id}) => ({
            name,
            front_default,
            index: id
          }))
        );
        setResponses(
          res.map(({ name, sprites: { front_default },id }, index) => ({
            name,
            front_default,
            index: id
          }))
        );
      }
    );
  };
  const prev = () => {
    if (offset !== 1) {
      get3Pokemons(offset - 3);
      setOffset(offset - 3);
    }
  };
  const next = () => {
    get3Pokemons(offset + 3);
    setOffset(offset + 3);
  };
  useEffect(() => {
    get3Pokemons(offset);
  }, []);
  return (
    <div>
    <div className="container">

      {responses.map(({ name, front_default, index }) => (
        <div key={`${index}`}  className="block">
          <div className="head">
            <div className="left">{name}</div> <div className="right">{index}</div>
          </div>
          <img src={front_default} />
        </div>
      ))}
    </div>
    <button onClick={prev}>Prev</button>
    <button onClick={next}>Next</button>
    </div>
  );
}
