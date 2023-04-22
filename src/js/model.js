import { async } from "regenerator-runtime";
import { API_URL } from './config';
import { getJson } from "./views/helpers";
export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
    },
};

export const loadRecipe = async function (id) {
    try {
        const data = await getJson(`${API_URL}${id}`)
        console.log(data);


        const { recipe } = data.data;
        state.recipe = {
            id: recipe.id,
            cookingTime: recipe.cooking_time,
            title: recipe.title,
            publiser: recipe.publiser,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            ingredients: recipe.ingredients,
        }
        // console.log(state.recipe)
    } catch (err) {
        console.log(`${err}`)
        throw (err);
    }

};

export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;
        const data = await getJson(`${API_URL}?search=${query}`);
        console.log(data);

        state.search.results = data.data.recipes.map(rec => {
            return {

                id: rec.id,
                title: rec.title,
                publiser: rec.publiser,
                image: rec.image_url,

            };

        });
        //  console.log(state.search.results);
    } catch (err) {
        console.log(`${err}`)
        throw (err);
    }
};
 