import React from "react";
import Recipe from "./Recipe";

const Favourites = ({ savedItems }) => {
  return (
    <div className="favourite">
      {savedItems.length === 0 && (
        <p className="text-center text-2xl text-rose-400 font-semibold lg:text-4xl capitalize">
          favourite list is empty
        </p>
      )}

      <div className="favourite container mx-auto py-10 flex flex-wrap gap-10 justify-center">
        {savedItems && savedItems.map((recipe) => <Recipe recipe={recipe} />)}
      </div>
    </div>
  );
};

export default Favourites;
