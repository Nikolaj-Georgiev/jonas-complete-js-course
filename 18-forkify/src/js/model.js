import { async } from "regenerator-runtime"
import { API_URL } from "./config";
import { getJson } from "./helpers";

// N.B.
// the state contains all the data about our application !!! 
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  }
}

export const loadRecipe = async function (id) {
  try {

    const data = await getJson(`${API_URL}${id}`);

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

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await getJson(`${API_URL}?search=${query}`)
    console.log(data);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      }
    });

  } catch (err) {
    console.error(`${err} 💥😬💩`);
    throw err;
  }
};

