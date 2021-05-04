import recipesDAO from "../dao/recipesDAO.js";

export default class RecipesController {
    static async getByName(req,res) {
        let filters = {};
        if(req.query.name) {
            filters.name = req.query.name;
        }
        const { recipesList } = await recipesDAO.getRecipes({
            filters
        });
        let response = {
            recipes:recipesList,
            filters:filters
        }
        res.json(response);
    }
    
    static async postRecipe(req,res) {
        try {
            const newName = req.body.name;
            const newIngredients = req.body.ingredients;
            const newCo2value = req.body.co2value;
            const newDescription = req.body.description;

            await recipesDAO.addRecipe(
                newName,
                newIngredients,
                newCo2value,
                newDescription,
            )
            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async editRecipe (req,res) {
        try {
            const recipeId = req.body._id;
            const newName = req.body.name;
            const newIngredients = req.body.ingredients;
            const newCo2value = req.body.co2value;
            const newDescription = req.body.description;

            const recipeResponse = await recipesDAO.updateRecipe(
                recipeId,
                newName,
                newIngredients,
                newCo2value,
                newDescription,
            )
            const { error } = recipeResponse;
            if(error) {
                res.status(400).json({error});
            }
            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async removeRecipe (req,res) {
        try {
            const recipeId = req.query.id;
            await recipesDAO.deleteRecipe(
            recipeId
            );
            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }
}