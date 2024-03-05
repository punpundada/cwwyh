import { Router } from "express";
import {
  userSignup,
  userLogin,
  deleteUser,
  getAllUserRecipe,
  setProfilePicture,
  getProfilePicture,
} from "../controller/UserController.js";
import ValidateToken from "../middleware/ValidationTokenHandler.js";

const userRouter = Router();

userRouter.post("/signup", userSignup);
userRouter.post("/login", userLogin);
userRouter.delete("/delete/:id", ValidateToken, deleteUser);
userRouter.get("/recipe/getAll", ValidateToken, getAllUserRecipe);
userRouter.post("/setProfile", ValidateToken, setProfilePicture);
userRouter.get("/getProfile", ValidateToken, getProfilePicture);


export default userRouter;
