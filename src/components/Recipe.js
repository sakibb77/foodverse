import React from "react";
import { Link } from "react-router-dom";

const Recipe = ({ recipe }) => {
  return (
    <div className="recipe w-80 overflow-hidden bg-white/75 rounded-2xl shadow-xl shadow-rose-100 p-5 border-2 border-white">
      <div className="img h-40 overflow-hidden flex items-center justify-center rounded-xl">
        <img
          src={recipe.image_url}
          alt={recipe.title}
          className="block w-full"
        />
      </div>
      <div className="text flex pt-5 flex-col">
        <span className="publisher text-sky-400 text-xs uppercase font-semibold tracking-widest">
          {recipe.publisher}
        </span>
        <h2 className="title truncate text-2xl font-medium capitalize">
          {recipe.title}
        </h2>
        <Link
          to={`/recipe-item/${recipe.recipe_id}`}
          className="bg-gradient-to-br from-rose-400 to-rose-600 p-3 px-8 text-rose-50 rounded-lg mt-2 self-start tracking-wider uppercase text-sm font-medium shadow-md shadow-rose-200 hover:shadow-lg hover:shadow-rose-300 duration-300"
        >
          view recipe
        </Link>
      </div>
    </div>
  );
};

export default Recipe;
