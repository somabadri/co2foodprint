import mongodb from "mongodb";

let users;
const ObjectId = mongodb.ObjectID;

export default class usersDAO {
    /*allows the server to be communicated with */
    static async injectDB(conn) {
        if (users) {
            return;
        } else {
            try {
                users = await conn.db(process.env.CO2FP_NS).collection("users");
            } catch (e) {
                console.error(
                    'Unable to get a collection handle in usersDAO: ' + e
                )
            }
        }
    }
    /*gets a user by finding their specified id if they have one */
    static async getUsers(params) {
        let cursor;
        let id = params.userid;
        if(id){
            try {
                cursor = await users.find({"user_id": id});
            } catch (e) {
                console.error('Unable to find specified user at id ' + id + " " + e);
                return { usersList: []}
            }
        } else {
            try {
                cursor = await users.find();
            } catch (e) {
                console.error('Unable to find users ' + e);
                return { usersList: []}
            }
        }

        try {
            const usersList = await cursor.toArray();
            return { usersList }
        } catch (e) {
            console.error('Unable to create recipesList for some reason ' + e);
        }
    }
    /*gets a recipe by first finding the user then finding that specified recipe */
    static async getRecipe(params) {
        let cursor;
        let userid = params.userid;
        let recipeid = params.recipeid;
        try {
            cursor = await users.find({"user_id": userid});
        } catch (e) {
            console.error('Unable to find specified user at id ' + userid + " " + e);
            return { recipe: []}
        }

        try {
            const recipe = await cursor.toArray()
            .then(user => {
                return (user[0].recipes);
            }).then(recipes => {
                return recipes.find(obj => {
                    return obj.recipe_id.toString() === recipeid;
                });
            });
            return { recipe }
        } catch (e) {
            console.error('Unable to create recipesList for some reason ' + e);
        }
    }
    /*first finds the user then adds a recipe to their recipe list */
    static async addRecipe(params,name,ingredients,co2value,description){
        let userid = params.userid;
        try {
            users.updateOne(
                {user_id:userid},
                {$push: {
                    recipes: {
                        "name":name,
                        "recipe_id":ObjectId(),
                        "ingredients":ingredients,
                        "co2value":co2value,
                        "description":description,
                    }
                }}
            );
        } catch (e) {
            console.error('Unable to find specified user at id ' + userid + " " + e);
            return { recipe: []}
        }
    }
    /*first finds a user then modifies a recipe in their recipe list */
    static async updateRecipe(params,recipeid,name,ingredients,description){
        let userid = params.userid;
        try {
            const updatedRecipe = await users.updateOne(
                {user_id:userid,"recipes.recipe_id":ObjectId(recipeid)},
                {$set: {
                        "recipes.$.name":name,
                        "recipes.$.description":description,
                }}
            );
            return updatedRecipe;
        } catch (e) {
            console.error('Unable to find specified user at id ' + userid + " " + e);
            return { recipe: []}
        }
    }
    /*first finds a user then deletes their specified recipe */
    static async deleteRecipe(params,recipeid){
        const userid = params.userid;
        try {
            const deletedRecipe = await users.updateOne(
                {user_id:userid},
                {"$pull": {
                    "recipes": {
                        "recipe_id":ObjectId(recipeid)
                    }
                }}
            );

            return deletedRecipe;
        } catch(e) {
            return { error: e };
        }
    }
    /*modifies a user by setting the request body to be the new user info */
    static async updateUser(
        id,
        body){
        try {
            
            const updatedUser = await users.updateOne(
                {user_id: id},
                { $set: body}
            );
            return updatedUser;
        } catch (e) {
            return { error: e };
        }
    }
    /*adds a user with the request body to the server */
    static async addUser(
        name,
        id,
        recipes,
        friends,
        profile,
        transport,
        post){
            try{
                const newUser = { 
                    'name': name,
                    'user_id':id,
                    'recipes':recipes,
                    'friends':friends,
                    'profile_pic':profile,
                    'transportation_co2': transport,
                    'most_recent_post': post,
                }
                return await users.insertOne(newUser);
            } catch (e) {
                console.error('Cannot post user ' + e);
                return { error: e };
            }
    }
    /*finds the specified user at their id and deletes them */
    static async deleteUser(id){
        try {
            const deletedUser = await users.deleteOne({
                user_id: id
            });

            return deletedUser;
        } catch(e) {
            return { error: e };
        }
    }
    /*first finds a user and adds a following to their following list */
    static async addFriend(
        params,
        name,
        id,
        profile,
        ){
            let userid = params.userid;
            try {
                users.updateOne(
                    {user_id:userid},
                    {$push: {
                        friends: {
                            "name":name,
                            "friend_id":id,
                            "profile_pic":profile,
                        }
                    }}
                );
            } catch (e) {
                console.error('Unable to find specified user at id ' + userid + " " + e);
            return { friends: []}
        }
    }
    /*first finds a user and deletes a following from their list */
    static async deleteFriend(params,friend_id){
        const userid = params.userid;
        try {
            const deletedRecipe = await users.updateOne(
                {user_id:userid},
                {"$pull": {
                    "friends": {
                        "friend_id":friend_id
                    }
                }}
            );

            return deletedRecipe;
        } catch(e) {
            return { error: e };
        }
    }
}