import React, { useEffect } from "react";
import { useParams } from "react-router";

const RecipeItem = () => {
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const getRecipeItemData = async () => {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/get?rId=${id}`
      );
      if (!res.ok) throw new Error("Recipe Data Not Found");
      const data = await res.json();
      console.log(data);
    };

    getRecipeItemData();
  }, []);

  return <div></div>;
};

export default RecipeItem;
