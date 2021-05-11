import usersDAO from "../dao/usersDAO.js";

export default class UsersController {
    static async get(req,res) {
        const { usersList } = await usersDAO.getUsers(req.params);
        let response = {
            users:usersList
        }
        res.json(response);
    }
    static async getRecipeById(req,res) {
        const { recipe } = await usersDAO.getRecipe(req.params);
        let response = {
            recipe:recipe
        }
        res.json(response);
    }
    static async postRecipe(req,res) {
        try {
            const newName = req.body.name;
            const newIngredients = req.body.ingredients;
            const newCo2value = req.body.co2value;
            const newDescription = req.body.description;
            const newTag = req.body.tag;

            await usersDAO.addRecipe(
                req.params,
                newName,
                newIngredients,
                newCo2value,
                newDescription,
                newTag
            )
            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }
    static async editRecipe(req,res) {
        try {
            const recipeId = req.body.recipe_id;
            const newName = req.body.name;
            const newIngredients = req.body.ingredients;
            const newCo2value = req.body.co2value;
            const newDescription = req.body.description;
            const newTag = req.body.tag;

            const recipeResponse = await usersDAO.updateRecipe(
                req.params,
                recipeId,
                newName,
                newIngredients,
                newCo2value,
                newDescription,
                newTag
            );
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
            await usersDAO.deleteRecipe(
                req.params,
                recipeId
            );
            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async post(req,res) {
        try {
            const newName = req.body.name;
            const newid = req.body.userid;
            const newRecipes = [];
            const newOverall = 0;
            const newFriends = [];
            const newProfile = req.body.profile_pic;
            const newTransport = 0;
            const newPost = "";
            const values = [0,0,0,0];
            const newTree = 1;

            await usersDAO.addUser(
                newName,
                newid,
                newRecipes,
                newOverall,
                newFriends,
                newProfile,
                newTransport,
                newPost,
                values,
                newTree
            )
            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async put(req,res) {
        try {
            const newName = req.body.name;
            const id = req.body.userid;
            const newOverall = req.body.overall_co2;
            const newFriends = req.body.friends;
            const newProfile = req.body.profile_pic;
            const newTransport = req.body.transportation_co2;
            const newPost = req.body.most_recent_post;
            const values = req.body.co2values;
            const newTree = req.body.tree;

            const recipeResponse = await usersDAO.updateUser(
                newName,
                id,
                newOverall,
                newFriends,
                newProfile,
                newTransport,
                newPost,
                values,
                newTree
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

    static async remove(req,res) {
        try {
            const userId = req.query.id;
            await usersDAO.deleteUser(
            userId
            );
            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }
}