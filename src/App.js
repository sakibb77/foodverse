import React, { useEffect, useRef, useState } from "react";
import { Route, Routes, useNavigate } from "react-router";
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
  const [savedItems, setSavedItems] = useState(() => {
    const localData = localStorage.getItem("recipes");
    return localData ? JSON.parse(localData) : [];
  });

  const navigate = useNavigate();
  const inputField = useRef(null);

  const searchHandler = (e) => {
    e.preventDefault();

    getData(searchQuery);

    //clear input value
    setSearchQuery("");
    inputField.current.blur();
    setRecipes([]);
    navigate("/");
  };

  const getData = async (searchQuery) => {
    try {
      setLoading(true);
      setStable("");
      setError("");

      const res = await fetch(
        ` https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchQuery}`
      );
      if (!res.ok) throw new Error("something went wrong");
      const data = await res.json();
      if (data.results === 0) throw new Error("Recipes Not Found");
      setRecipes(data?.data?.recipes);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const checkLocalData = (data) => {
    const localData = JSON.parse(localStorage.getItem("recipes"));
    const existData = localData?.some((item) => item.id === data.id);

    if (!existData) {
      setSavedItems([...savedItems, data]);
    } else {
      const filterData = localData?.filter((item) => item.id !== data.id);
      setSavedItems(filterData);
    }
  };

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(savedItems));
  }, [savedItems]);

  const favouriteHandler = (id) => {
    fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)
      .then((res) => res.json())

      .then((data) => checkLocalData(data.data.recipe));

    navigate("/Favourites");
  };

  return (
    <>
      <div className="App bg-rose-50 text-gray-600 min-h-screen px-9">
        <NavBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          inputField={inputField}
          searchHandler={searchHandler}
          savedItems={savedItems}
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
          <Route
            path="/favourites"
            element={<Favourites savedItems={savedItems} />}
          />
          <Route
            path="/recipe-item/:id"
            element={
              <RecipeItem
                favouriteHandler={favouriteHandler}
                savedItems={savedItems}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
