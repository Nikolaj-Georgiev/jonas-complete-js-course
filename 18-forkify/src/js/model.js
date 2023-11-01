import { async } from "regenerator-runtime"
import { API_URL } from "./config";
import { getJson } from "./helpers";

export const state = {
  recipe: {},
}

export const loadRecipe = async function (id) {
  try {

    const data = await getJson(`${API_URL}/${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      cookingTime: recipe.cooking_time,
      servings: recipe.servings,
      ingredients: recipe.ingredients
    };

  } catch (err) {
    throw err;
  }
};