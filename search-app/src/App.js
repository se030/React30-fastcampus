import NavigationBar from "./components/NavigationBar";
import SearchInput from "./components/SearchInput";
import { Routes, Route, Navigate } from "react-router-dom"
import AllResult from "./components/results/AllResult";

function App() {
  return <div className="bg-slate-50 min-h-screen">
    <div className="flex flex-wrap justify-center">
      <SearchInput />
      <NavigationBar />
    </div>
    <Routes>
      <Route exact path="/" element={<Navigate to="/all" />} />
      <Route exact path="/all" element={<AllResult />} />
    </Routes>
  </div>
}

export default App;
