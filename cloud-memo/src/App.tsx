 import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";

axios.defaults.baseURL = "http://localhost:8080"

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
    )
}

export default App;
