import express from 'express';
import RecipeCtrl from "./recipes.controller.js";

const router = express.Router();

router
    .route("/")
    .get(RecipeCtrl.getByName)
    .post(RecipeCtrl.postRecipe)
    .put(RecipeCtrl.editRecipe)
    .delete(RecipeCtrl.removeRecipe)

export default router;