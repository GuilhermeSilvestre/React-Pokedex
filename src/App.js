import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Exibirpokemon from "./Exibirpokemon";

//https://pokeapi.co/api/v2/pokemon/ditto
//https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png

function App() {
  let [pokemon, setPokemon] = useState("");
  let [id, setId] = useState("");
  let [name, setName] = useState("");
  let [type, setType] = useState("");
  let [height, setHeight] = useState("");
  let [weight, setWeight] = useState("");
  let [image, setImage] = useState("");
  let [notfound, setNotfound] = useState(false);

  //Esse show serve apenas para forçar um numero diferente a cada requisição (veja + abaixo)
  const [show, setShow] = useState(0);

  const [pokemonData, setPokemonData] = useState(null);

  //Carregando informação da API
  const fetchData = async (pokeNameORNumber) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokeNameORNumber}`
      );
      setPokemonData(response.data);

      //console.log(response.data);

      setId(response.data.id);
      setType(response.data.types[0].type.name);
      setName(response.data.forms[0].name);
      setHeight(response.data.height / 10);
      setWeight(response.data.weight / 10);

      //Esse show será enviado como props sempre com valor diferente
      //Foi um truque que pensei para caso o usuario faça uma requisição, depois clique para fechar
      //e em seguida clique para fazer a mesma requisição novamente com o mesmo id
      setShow(show + 1);

      //console.log(id, name, height, weight, type);
    } catch (error) {
      setNotfound(true);
      console.error(error);
    }
  };

  //-------------------------------------
  //Requiseção (para foto)
  useEffect(() => {
    if (id) {
      setImage(
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
      );
    }
  }, [id]);

  useEffect(() => {
    if (notfound) {
      alert("Pokémon não encontrado");
      setNotfound(false);
    }
  }, [notfound]);
  //-------------------------------------

  const handleButtonClick = () => {
    fetchData(pokemon);
  };

  return (
    <>
      <div className="container">
        <h1>P O K E D E X</h1>
        <input
          className="inputPoke"
          value={pokemon}
          type="text"
          placeholder="Nome ou número do pokémon"
          onChange={(e) => setPokemon(e.target.value)}
        />
        <button onClick={handleButtonClick}>GO</button>
        <p>by TuRtLeDz</p>
        {id && name ? (
          <>
            <Exibirpokemon
              name={name}
              id={id}
              type={type}
              height={height}
              weight={weight}
              image={image}
              show={show}
            />
          </>
        ) : null}
      </div>
    </>
  );
}

export default App;
