import Video from "../models/Video";
import User from "../models/User";
import Comment from "../models/Comment"; 


export const home = async (req, res) => {
  const videos = await Video.find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
  return res.render("home", { pageTitle: "Home", videos });
}

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, "i"),
      },
    }).populate("owner");
  }

  return res.render("search", { pageTitle: "Search", videos });
}

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
}

export const postUpload = async (req, res) => {
  const { user: { _id } } = req.session;
  const { video, thumbnail } = req.files;
  const { title, description, hashtags } = req.body;
  try {
    const newVideo = await Video.create({
      fileUrl: video[0].path,
      thumbnailUrl: thumbnail[0].path,  
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
      owner: _id,
    });

    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    await user.save();

    req.flash("success", "동영상 업로드가 완료되었습니다");
    return res.redirect("/");
  } catch(error) {
    req.flash("error", error._message);
    return res.status(400).render("upload", { 
      pageTitle: "Upload Video", 
    });
  }
}

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate("owner").populate("comments");

  if (video === null) {
    return res.status(404).render("404", { pageTitle: "404 Not Found" });
  }
  return res.render("watch", { pageTitle: video.title, video });
}

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id }
  } = req.session; 
  const video = await Video.findById(id);

  if (!video) {
    return res.status(404).render("404", { pageTitle: "404 Not Found" });
  }
  if (String(video.owner) !== String(_id)) {
    req.flash("error", "동영상 게시자만 편집할 수 있습니다");
    return res.status(403).redirect("/");
  }
  return res.render("edit", { pageTitle: `Edit <${video.title}>`, video });
}

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id }
  } = req.session; 
  const { title, description, hashtags } = req.body;
  const video = Video.findById(id);

  if (!video) {
    return res.status(404).render("404", { pageTitle: "404 Not Found" });
  }

  if (String(video.owner) !== String(_id)) {
    req.flash("error", "동영상 게시자만 편집할 수 있습니다");
    return res.status(403).redirect("/");
  }

  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });

  req.flash("success", "동영상 정보를 수정하였습니다");
  return res.redirect(`/videos/${id}`); 
}

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id }
  } = req.session; 
  const video = await Video.findById(id);
  const user = await User.findById(_id);

  if (!video) {
    return res.status(404).render("404", { pageTitle: "404 Not Found" });
  }

  if (String(video.owner) !== String(_id)) {
    req.flash("error", "동영상 게시자만 삭제할 수 있습니다");
    return res.status(403).redirect("/");
  }

  await Video.findByIdAndDelete(id);
  user.videos.splice(user.videos.indexOf(id), 1);
  await user.save();

  req.flash("success", "동영상이 삭제되었습니다");
  return res.redirect("/");
}

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);

  if (!video) {
    return res.sendStatus(404);
  }
  
  video.metaData.views = video.metaData.views + 1;
  await video.save();
  return res.sendStatus(200); 
}

export const createComment = async (req, res) => {
  const {
    session: { user },
    params: { id },
    body: { text },
  } = req;

  const video = await Video.findById(id).populate("comments");
  if (!video) {
    return res.sendStatus(404);
  }
  const foundUser = await User.findById({ _id: user._id }).populate("comments");
  if (!foundUser) {
    return res.sendStatus(404);
  }

  const comment = await Comment.create({
    text,
    owner: user._id,
    video: id,
  });
  video.comments.push(comment._id); 
  video.save();
  foundUser.comments.push(comment._id);
  foundUser.save();

  return res.status(201).json({ newCommentId: comment._id });
  // HTTP 상태 코드 201 : created 
} 