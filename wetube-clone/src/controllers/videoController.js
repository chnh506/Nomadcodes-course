import Video from "../models/Video";


export const home = async (req, res) => {
  const videos = await Video.find({}).sort({ createdAt: "desc" });
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
    });
  }

  return res.render("search", { pageTitle: "Search", videos });
}

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
}

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect("/");
  } catch(error) {
    console.log(error);
    return res.status(400).render("upload", { 
      pageTitle: "Upload Video", 
      errorMessage: error._message,
    });
  }
}

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);

  if (video === null) {
    return res.status(404).render("404", { pageTitle: "404 Not Found" });
  }
  return res.render("watch", { pageTitle: video.title, video });
}

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);

  if(!video) {
    return res.status(404).render("404", { pageTitle: "404 Not Found" });
  }
  return res.render("edit", { pageTitle: `Edit <${video.title}>`, video });
}

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;

  const isVideoExists = Video.exists({ _id: id });
  if (!isVideoExists) {
    return res.status(404).render("404", { pageTitle: "404 Not Found" });
  }

  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`); 
}

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
}