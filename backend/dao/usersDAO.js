import mongodb from "mongodb";

let users;
const ObjectId = mongodb.ObjectID;

export default class usersDAO {
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

    static async addRecipe(params,name,ingredients,co2value,description,tag){
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
                        "tag":tag
                    }
                }}
            );
        } catch (e) {
            console.error('Unable to find specified user at id ' + userid + " " + e);
            return { recipe: []}
        }
    }

    static async updateRecipe(params,recipeid,name,ingredients,co2value,description,tag){
        let userid = params.userid;
        try {
            const updatedRecipe = await users.updateOne(
                {user_id:userid,"recipes.recipe_id":ObjectId(recipeid)},
                {$set: {
                        "recipes.$.name":name,
                        "recipes.$.ingredients":ingredients,
                        "recipes.$.co2value":co2value,
                        "recipes.$.description":description,
                        "recipes.$.tag":tag
                }}
            );
            return updatedRecipe;
        } catch (e) {
            console.error('Unable to find specified user at id ' + userid + " " + e);
            return { recipe: []}
        }
    }

    static async deleteRecipe(params,recipeid){
        const userid = params.userid;
        console.log(userid);
        console.log(recipeid);
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

    static async updateUser(
        name,
        id,
        overall,
        friends,
        profile,
        transport,
        post,
        values,
        tree){
        try {
            const updatedUser = await users.updateOne(
                {user_id: ObjectId(id)},
                { $set: {
                    name: name,
                    user_id: id,
                    overall_co2: overall,
                    friends: friends,
                    transportation_co2: transport,
                    most_recent_post: post,
                    co2values_this_month: values,
                    tree_position: tree
                }}
            );
            return updatedUser;
        } catch (e) {
            return { error: e };
        }
    }

    static async addUser(
        name,
        id,
        recipes,
        overall,
        friends,
        profile,
        transport,
        post,
        values,
        tree){
            try{
                const newUser = { 
                    'name': name,
                    'user_id':id,
                    'recipes':recipes,
                    'overall_co2':overall,
                    'friends':friends,
                    'transportation_co2': transport,
                    'most_recent_post': post,
                    'co2values_this_month': values,
                    'tree_position': tree
                }
                return await users.insertOne(newUser);
            } catch (e) {
                console.error('Cannot post user ' + e);
                return { error: e };
            }
    }

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
}