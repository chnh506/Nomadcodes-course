import express from "express";
import { getUpload, postUpload, watch, getEdit, postEdit, deleteVideo } from "../controllers/videoController";


const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch); 
videoRouter.route("/upload").get(getUpload).post(postUpload);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
videoRouter.get("/:id([0-9a-f]{24})/delete", deleteVideo);


export default videoRouter;