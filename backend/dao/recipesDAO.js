import mongodb from "mongodb";

let recipes;
const ObjectId = mongodb.ObjectID;

export default class recipesDAO {
    static async injectDB(conn) {
        if (recipes) {
            return;
        } else {
            try {
                recipes = await conn.db(process.env.CO2FP_NS).collection("recipes");
            } catch (e) {
                console.error(
                    'Unable to get a collection handle in recipesDAO: ' + e
                )
            }
        }
    }

    static async getRecipes({
        filters = null,
    } = {}) {
        let query;
        if (filters) {
            if ("name" in filters) {
                query = { $text: {$search: filters["name"]}};
            }
        }

        let cursor;

        try {
            cursor = await recipes.find(query);
        } catch (e) {
            console.error('Unable to find recipes ' + e);
            return { recipesList: []}
        }

        try {
            const recipesList = await cursor.toArray();
            return { recipesList }
        } catch (e) {
            console.error('Unable to create recipesList for some reason ' + e);
        }
    }

    static async addRecipe(name,ingredients,co2value,description){
        try{
            const newRecipe = { 
                'name': name,
                'ingredients': ingredients,
                'co2value': co2value,
                'description': description,
            }
            return await recipes.insertOne(newRecipe);
        } catch (e) {
            console.error('Cannot post review ' + e);
            return { error: e };
        }
    }

    static async updateRecipe(id,name,ingredients,co2value,description){
        try {
            const updatedRecipe = await recipes.updateOne(
                {_id: ObjectId(id)},
                { $set: {
                    name: name,
                    ingredients: ingredients,
                    co2value: co2value,
                    description: description
                }}
            );
            return updatedRecipe;
        } catch (e) {
            return { error: e };
        }
    }

    static async deleteRecipe(id){
        try {
            const deletedRecipe = await recipes.deleteOne({
                _id: ObjectId(id)
            });

            return deletedRecipe;
        } catch(e) {
            return { error: e };
        }
    }
}