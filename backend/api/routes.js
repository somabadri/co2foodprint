import express from 'express';
import UserCtrl from "./users.controller.js";

const router = express.Router();
/*sets up the specific urls to make HTTP requests */
router
    .route("/")
    .post(UserCtrl.post)
    .put(UserCtrl.put)
    .delete(UserCtrl.remove)

router
    .route("/:userid?")
    .get(UserCtrl.get)

router
    .route("/:userid/:recipeid")
    .get(UserCtrl.getRecipeById)

router
    .route("/:userid")
    .post(UserCtrl.postRecipe)
    .put(UserCtrl.editRecipe)
    .delete(UserCtrl.removeRecipe)
router
    .route("/:userid/friends")
    .post(UserCtrl.postFriend)
    .delete(UserCtrl.removeFriend)
export default router;