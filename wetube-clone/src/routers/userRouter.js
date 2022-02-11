import express from "express";
import { logout, edit, see, startGithubLogin, finishGithubLogin } from "../controllers/userController";


const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/:id(\\d+)", see);
userRouter.get("/edit", edit);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);


export default userRouter;