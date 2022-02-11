import User from "../models/User";
import bcrypt from "bcrypt";


export const getJoin = (req, res) => 
  res.render("join", { pageTitle: "Join" });

export const postJoin = async (req, res) => {
  const pageTitle = "Join";
  const { name, email, username, password, password2, location } = req.body;
  if (password !== password2) {
    return res.status(400).render("join", { 
      pageTitle: "Join", 
      errorMessage: "비밀번호가 서로 다릅니다. 다시 시도해 주세요.",
    });
  }
  const exists = User.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.status(400).render("join", { 
      pageTitle,
      errorMessage: "username 혹은 email이 이미 존재합니다.",
    });
  }
  try {
    await User.create({
      name,
      email,
      username,
      password,
      location,
    });
    return res.redirect("/login");
  } catch(error) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: error._message,
    });
  }
};

export const getLogin = (req, res) => res.render("login", { pageTitle: "Login" });

export const postLogin = async (req, res) => {
  const pageTitle = "Login";
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "해당 Username은 존재하지 않습니다.",
    });
  }

  const pwMatches = await bcrypt.compare(password, user.password);
  if (!pwMatches) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "비밀번호가 틀립니다. 다시 입력해 주세요.",
    });
  }

  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/") ;
}

export const logout = (req, res) => res.send("Log Out");

export const see = (req, res) => {
  return res.send(`See User #${req.params.id}`);
} 

export const edit = (req, res) => res.send("Edit User");

export const remove = (req, res) => res.send("Delete User");

