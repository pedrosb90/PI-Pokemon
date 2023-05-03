import "./App.css";
import Landing from "./components/Landing";
import Home from "./components/Home";
import { Route, Link } from "react-router-dom";
import Types from "./components/Types";
import PokemonDetail from "./components/PokemonDetail";
import CreatePokemons from "./components/CreatePokemons";
import HomeButton from "./components/buttons/HomeButton";
import SuccessPage from "./components/specials/SuccessFormPage";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001/";

function App() {
  return (
    <div>
      <Link to="/home">
        <HomeButton>Home</HomeButton>
      </Link>
      <Route exact path="/" component={Landing} />
      <Route exact path="/welcome" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/types" component={Types} />
      <Route exact path="/success-page" component={SuccessPage} />
      <Route path="/pokemons/:pokeId" component={PokemonDetail} />
      <Route path="/createpokemons" component={CreatePokemons} />
    </div>
  );
}

export default App;
