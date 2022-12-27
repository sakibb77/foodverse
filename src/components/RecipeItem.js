import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useFetch } from "../hook/useFetch";
import { CgSpinner } from "react-icons/cg";
import { MdPersonOutline } from "react-icons/md";
import { CiClock2 } from "react-icons/ci";
import { Link } from "react-router-dom";

const RecipeItem = ({ favouriteHandler, savedItems }) => {
  const [itemSetStatus, setItemSetStatus] = useState(null);
  const { id } = useParams();
  const { data: recipe, loading, error } = useFetch(id);

  //cooking handler
  function toHoursAndMinutes(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (totalMinutes < 60) return `${minutes}min`;
    return `${hours}h:${minutes}min`;
  }

  useEffect(() => {
    if (!recipe) return;
    setItemSetStatus(savedItems?.some((item) => item.id === recipe.id));
  }, [recipe]);

  return (
    <>
      {loading && (
        <div className="flex h-screen items-center justify-center">
          <p className="text-center">
            {error ? error : <CgSpinner className="animate-spin text-2xl" />}
          </p>
        </div>
      )}
      {recipe && (
        <div className="recipe-item container mx-auto py-10 flex gap-10 ">
          <div className="recipe-item container py-8 mx-auto grid gap-14 grid-cols-1 lg:grid-cols-2">
            <div className="recipe-left flex flex-col gap-5">
              <div className="flex justify-center md:justify-between items-center flex-col md:flex-row">
                <p className="publisher uppercase tracking-wider text-violet-500 font-semibold">
                  {recipe?.publisher}
                </p>
                <button
                  onClick={() => favouriteHandler(recipe.id)}
                  className={`bg-gradient-to-br  p-3 px-8  rounded-lg mt-2  tracking-wider uppercase text-sm font-medium shadow-md  hover:shadow-lg  duration-300 ${
                    itemSetStatus
                      ? "text-orange-50 from-orange-400 to-orange-600 shadow-orange-200 hover:shadow-orange-300"
                      : "text-pink-50 from-pink-400 to-pink-600 shadow-pink-200 hover:shadow-pink-300"
                  }`}
                >
                  {itemSetStatus
                    ? "- remove from favourite"
                    : "+ save as favourite"}
                </button>
              </div>
              <h2 className="text-2xl lg:text-5xl font-semibold capitalize text-gray-700">
                {recipe?.title}
              </h2>
              <div className="flex justify-between flex-col md:flex-row gap-2">
                <p className="flex uppercase items-center gap-2 tracking-wider text-orange-500 font-semibold">
                  <MdPersonOutline />
                  <span>servings (people):</span>
                  <span>{recipe?.servings}</span>
                </p>
                <p className="flex uppercase items-center gap-2 tracking-wider text-orange-500 font-semibold">
                  <CiClock2 />
                  cooking time:
                  <span>{toHoursAndMinutes(recipe?.cooking_time)}</span>
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  to={"/"}
                  className="bg-gradient-to-br from-rose-400 to-rose-600 p-3 px-5 lg:px-8  text-rose-50 rounded-lg mt-2 self-start tracking-wider uppercase text-sm font-medium shadow-md shadow-rose-200 hover:shadow-lg hover:shadow-rose-300 duration-300"
                >
                  go back
                </Link>
                <a
                  href={recipe?.source_url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-gradient-to-br from-green-400 to-green-600 p-3 px-5 lg:px-8 text-green-50 rounded-lg mt-2 self-start tracking-wider uppercase text-sm font-medium shadow-md shadow-green-200 hover:shadow-lg hover:shadow-green-300 duration-300"
                >
                  get direction
                </a>
              </div>
              <div className="ingreduents ">
                <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
                <ul className="list-none flex flex-col gap-2">
                  {recipe?.ingredients?.map((ing, i) => {
                    return (
                      <li key={i} className="text-lg font-medium text-gray-500">
                        {ing?.quantity} {ing?.unit}
                        {ing?.description}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="recipe-right row-start-1 lg:row-start-auto">
              <div className="recipe-item-img flex items-center justify-center h-[60vh] rounded-xl overflow-hidden shadow-md border duration-300 group">
                <img
                  src={recipe?.image_url}
                  alt={recipe?.title}
                  className="h-full w-full object-cover duration-300 group-hover:scale-105 inline-block"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeItem;
