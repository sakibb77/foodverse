import Recipe from "./Recipe";
import { CgSpinner } from "react-icons/cg";
import React from "react";

const Home = ({ recipes, loading, error, stable }) => {
  return (
    <div className="home container mx-auto py-10 flex flex-wrap gap-10 justify-center">
      {!loading && !error && recipes.length === 0 ? (
        <p className="text-center text-2xl text-rose-400 font-semibold lg:text-4xl capitalize">
          {stable}
        </p>
      ) : (
        loading && (
          <p className="text-center text-2xl text-rose-400 font-semibold lg:text-4xl">
            {error ? error : <CgSpinner className="animate-spin" />}
          </p>
        )
      )}

      {recipes?.length > 0 &&
        recipes.map((recipe) => (
          <Recipe key={recipe.recipe_id} recipe={recipe} />
        ))}
    </div>
  );
};

export default Home;
