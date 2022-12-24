import React, { useRef, useState } from "react";
import { Route, Routes } from "react-router";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Favourites from "./components/Favourites";
import NotFound from "./components/NotFound";
import RecipeItem from "./components/RecipeItem";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stable, setStable] = useState(
    "Nothing to show, please search something!"
  );
  const inputField = useRef(null);

  const searchHandler = (e) => {
    e.preventDefault();

    getData(searchQuery);

    //clear input value
    setSearchQuery("");
    inputField.current.blur();
    setRecipes([]);
  };

  const getData = async (searchQuery) => {
    try {
      setLoading(true);
      setStable("");
      setError("");

      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/search?q=${searchQuery}`
      );
      if (!res.ok) throw new Error("Recipes Not Found");
      const data = await res.json();
      setRecipes(data.recipes);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="App bg-rose-50 text-gray-600 min-h-screen px-9">
        <NavBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          inputField={inputField}
          searchHandler={searchHandler}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                recipes={recipes}
                loading={loading}
                error={error}
                stable={stable}
              />
            }
          />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/recipe-item/:id" element={<RecipeItem />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
