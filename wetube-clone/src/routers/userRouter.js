import express from "express";
import { protectorMiddleware, publicOnlyMiddleware, avatarUpload } from "../middlewares";
import { 
  logout, 
  see, 
  startGithubLogin, 
  finishGithubLogin, 
  getEdit, 
  postEdit, 
  getChangePassword, 
  postChangePassword 
} from "../controllers/userController";


const userRouter = express.Router();

userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.get("/logout", protectorMiddleware, logout);
userRouter.get("/:id([0-9a-f]{24})", see);
userRouter.route("/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(avatarUpload.single("avatar"), postEdit);
userRouter.route("/change-password")
  .all(protectorMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);


export default userRouter;