import { Routes, Route } from "react-router-dom";
import "./App.css";
import HorizontalSearchBar from "./components/filter";
import PropertyPage from "./components/property";

function App() {
  return (
    <>
      <div className="main_title">ALEX property</div>

      <Routes>
        <Route
          path="/"
          element={<HorizontalSearchBar />}
        />

        <Route
          path="/property/:id"
          element={<PropertyPage />}
        />
      </Routes>
    </>
  );
}

export default App;
