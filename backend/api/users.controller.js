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

            await usersDAO.addRecipe(
                req.params,
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
    static async editRecipe(req,res) {
        try {
            const recipeId = req.body.recipe_id;
            const newName = req.body.name;
            const newIngredients = req.body.ingredients;
            const newCo2value = req.body.co2value;
            const newDescription = req.body.description;

            const recipeResponse = await usersDAO.updateRecipe(
                req.params,
                recipeId,
                newName,
                newIngredients,
                newCo2value,
                newDescription,
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
            const newid = req.body.user_id;
            const newRecipes = [];
            const newFriends = [];
            const newProfile = req.body.profile_pic;
            const newTransport = 0;
            const newPost = "";

            await usersDAO.addUser(
                newName,
                newid,
                newRecipes,
                newFriends,
                newProfile,
                newTransport,
                newPost,
            )
            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async put(req,res) {
        try {
            const id = req.body.user_id;
            const recipeResponse = await usersDAO.updateUser(
                id,req.body
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
            const userId = req.query.user_id;
            await usersDAO.deleteUser(
            userId
            );
            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async postFriend(req,res){
        try {
            const newName = req.body.name;
            const newid = req.body.friend_id;
            const newPic = req.body.profile_pic;

            await usersDAO.addFriend(
                req.params,
                newName,
                newid,
                newPic
            )
            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async removeFriend(req,res) {
        try {
            const userId = req.query.friend_id;
            await usersDAO.deleteFriend(
                req.params,
                userId
            );
            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }
}