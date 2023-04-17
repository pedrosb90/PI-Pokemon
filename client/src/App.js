import "./App.css";
import Landing from "./components/Landing";
import Home from "./components/Home";
import { Route, Link } from "react-router-dom";
import Types from "./components/Types";
import PokemonDetail from "./components/PokemonDetail";
import CreatePokemons from "./components/CreatePokemons";
import HomeButton from "./components/buttons/HomeButton";
import backgroundImage from "/Users/pedro/Desktop/Henry/P INDIVIDUALES/PI-Pokemon-main/client/src/40128.jpeg";

function App() {
  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "120%",
        width: "100%",
        zoom: 0.65,
        margin: 0,
      }}
    >
      <div>
        <Link to="/home">
          <HomeButton>Home</HomeButton>
        </Link>
      </div>

      <Route exact path="/welcome" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/types" component={Types} />
      <Route path="/pokemons/:pokeId" component={PokemonDetail} />
      <Route path="/createpokemons" component={CreatePokemons} />
    </div>
  );
}

export default App;
