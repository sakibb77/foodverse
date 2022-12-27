import React from "react";
import { CgSpinner } from "react-icons/cg";
import Recipe from "./Recipe";
import FryingPan from "./FryingPan";

const Home = ({ recipes, loading, error, stable }) => {
  return (
    <div className="home container mx-auto py-10 flex flex-wrap gap-10 justify-center">
      {!loading && !error && recipes?.length === 0 ? (
        <div className="h-screen">
          <p className="text-center text-2xl text-rose-400 font-semibold lg:text-4xl capitalize">
            {stable}
          </p>
          {<FryingPan />}
        </div>
      ) : (
        loading && (
          <p className="text-center text-2xl text-rose-400 font-semibold lg:text-4xl">
            {error ? error : <CgSpinner className="animate-spin" />}
          </p>
        )
      )}

      {recipes?.length > 0 &&
        recipes.map((recipe) => <Recipe key={recipe.id} recipe={recipe} />)}
    </div>
  );
};

export default Home;
