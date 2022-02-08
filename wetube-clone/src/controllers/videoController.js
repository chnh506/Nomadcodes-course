import Video from "../models/Video";


export const home = async (req, res) => {
  const videos = await Video.find({});
  return res.render("home", { pageTitle: "Home", videos });
}

export const search = (req, res) => res.send("Search Video");

export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Upload Video" });
}

export const postUpload = (req, res) => {
  const { title } = req.body;
  res.redirect("/");
}

export const watch = (req, res) => {
  const { id } = req.params;
  return res.render("watch", { pageTitle: `Watching`});
}

export const getEdit = (req, res) => {
  const { id } = req.params;
  return res.render("edit", { pageTitle: `Editing`});
}

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  return res.redirect(`/videos/${id}`); 
}

export const remove = (req, res) => res.send("Remove Video");