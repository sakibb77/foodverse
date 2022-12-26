import React from "react";
import { useParams } from "react-router";
import { useFetch } from "../hook/useFetch";
import { CgSpinner } from "react-icons/cg";
import { MdPersonOutline } from "react-icons/md";
import { CiClock2 } from "react-icons/ci";

const RecipeItem = () => {
  const { id } = useParams();
  const { data: recipe, loading, error } = useFetch(id);

  //cooking handler
  function toHoursAndMinutes(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (totalMinutes < 60) return `${minutes}min`;
    return `${hours}h:${minutes}min`;
  }

  return (
    <div className="recipe-item container mx-auto py-10 flex gap-10 ">
      {loading ? (
        <p className="text-center">
          {error ? error : <CgSpinner className="animate-spin" />}
        </p>
      ) : (
        <div className="recipe-item container py-8 mx-auto grid gap-10 grid-cols-1 lg:grid-cols-2">
          <div className="recipe-left flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <p className="publisher uppercase tracking-wider text-violet-500 font-semibold">
                {recipe?.publisher}
              </p>
              <button className="bg-gradient-to-br from-pink-400 to-pink-600 p-3 px-8 text-pink-50 rounded-lg mt-2 self-start tracking-wider uppercase text-sm font-medium shadow-md shadow-pink-200 hover:shadow-lg hover:shadow-pink-300 duration-300">
                + save as favourite
              </button>
            </div>
            <h2 className="text-4xl lg:text-6xl font-semibold capitalize text-gray-700">
              {recipe?.title}
            </h2>
            <div className="flex justify-between">
              <p className="flex uppercase items-center gap-2 tracking-wider text-orange-500 font-semibold">
                <MdPersonOutline />
                <span>servings (people):</span>
                <span>{recipe?.servings}</span>
              </p>
              <p className="flex uppercase items-center gap-2 tracking-wider text-orange-500 font-semibold">
                <CiClock2 />
                cooking time:{" "}
                <span>{toHoursAndMinutes(recipe?.cooking_time)}</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-gradient-to-br from-rose-400 to-rose-600 p-3 px-8 text-rose-50 rounded-lg mt-2 self-start tracking-wider uppercase text-sm font-medium shadow-md shadow-rose-200 hover:shadow-lg hover:shadow-rose-300 duration-300">
                go back
              </button>
              <button className="bg-gradient-to-br from-green-400 to-green-600 p-3 px-8 text-green-50 rounded-lg mt-2 self-start tracking-wider uppercase text-sm font-medium shadow-md shadow-green-200 hover:shadow-lg hover:shadow-green-300 duration-300">
                get direction
              </button>
            </div>
            <div className="ingreduents ">
              <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
              <ul className="list-none flex flex-col gap-2">
                {recipe?.ingredients?.map((ing, i) => {
                  return (
                    <li key={i}>
                      {ing?.quantity} {ing?.unit}
                      {ing?.description}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="recipe-right">
            <div className="recipe-item-img h-[60vh] rounded-xl overflow-hidden shadow-md border duration-300 group">
              <img
                src={recipe?.image_url}
                alt={recipe?.title}
                className="h-full w-full object-cover duration-300 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeItem;
