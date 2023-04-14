import "./App.css";
import Landing from "./components/Landing";
import Home from "./components/Home";
import { Route } from "react-router-dom";
import Types from "./components/Types";
import PokemonDetail from "./components/PokemonDetail";
import CreatePokemons from "./components/CreatePokemons";
import backgroundImage from "/Users/pedro/Desktop/Henry/P INDIVIDUALES/PI-Pokemon-main/client/src/40128.jpeg";

function App() {
  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Route exact path="/welcome" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/types" component={Types} />
      <Route path="/pokemons/:pokeId" component={PokemonDetail} />
      <Route path="/createpokemons" component={CreatePokemons} />
    </div>
  );
}

export default App;
