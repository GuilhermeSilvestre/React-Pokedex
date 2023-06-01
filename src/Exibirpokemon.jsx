import { useEffect, useState } from "react";

export default (props) => {
  const [show, setShow] = useState(true);

  let name = props.name;
  let id = props.id;
  let type = props.type;
  let height = props.height;
  let weight = props.weight;
  let image = props.image;

  // esse showAgain é o truque para fazer o botão GO exibir o pokemon
  // mesmo se o usuário fizer a mesma requisição novamente (com o msemo id)
  let showAgain = props.show;

  useEffect(() => {
    setShow(true);
  }, [name, id, type, height, weight, image, showAgain]);

  function HideResult() {
    setShow(!show);
  }

  const handleButtonRight = () => {
    props.function(id + 1);
  };
  const handleButtonLeft = () => {
    if (id >= 2) props.function(id - 1);
  };

  return (
    <>
      {show ? (
        <div className="pokestatus">
          <div className="botoes">
            <button onClick={handleButtonLeft}>◄</button>
            <button onClick={handleButtonRight}>►</button>
          </div>
          <img src={image} alt={name}></img>
          <p className="pokeName">{name.toUpperCase()}</p>
          <p>Número: {id} </p>
          <p>Tipo: {type} </p>
          <p>Altura: {height} m</p>
          <p>Peso: {weight} kgs</p>
          <button onClick={HideResult}> X </button>
        </div>
      ) : null}
    </>
  );
};
