import express from "express";
import { protectorMiddleware, videoUpload } from "../middlewares";
import { getUpload, postUpload, watch, getEdit, postEdit, deleteVideo } from "../controllers/videoController";


const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch); 
videoRouter.route("/upload")
  .all(protectorMiddleware)
  .get(getUpload)
  .post(videoUpload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 }
  ]), postUpload);
videoRouter.route("/:id([0-9a-f]{24})/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete")
  .all(protectorMiddleware)
  .get(deleteVideo);


export default videoRouter;