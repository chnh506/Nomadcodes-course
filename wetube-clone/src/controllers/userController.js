import User from "../models/User";
import fetch from "node-fetch";
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
  const user = await User.findOne({ username, githubOnly: false });
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

export const startGithubLogin = (req, res) => {
  const baseUrl = `https://github.com/login/oauth/authorize`;
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
  // Github login step 1 : Request a user's GitHub identity
}

export const finishGithubLogin = async (req, res) => {
  const baseUrl = `https://github.com/login/oauth/access_token`;
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;

  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  // Github login step 2 : Users are redirected back to your site by GitHub

  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";

    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
     // user data 받기

    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    if(!emailObj) {
      // 등록된 이메일이 없을 때는 따로 알려줘야 한다.
      return res.redirect("/login");
    }
    // email data 받기

    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
      user = await User.create({
        name: userData.name,
        email: emailObj.email,
        username: userData.login,
        password: "",
        location: userData.location,
        githubOnly: true, 
        avatarUrl: userData.avatar_url,
      });
    } 
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/"); 
  } else {
    return res.redirect("/login");
  }
  // Github login step 3 : Use the access token to access the API
  // user data와 email data를 따로 받고, 그 데이터를 가지고 로그인을 수행한다.
}

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
}

export const see = (req, res) => {
  return res.send(`See User #${req.params.id}`);
} 

export const edit = (req, res) => res.send("Edit User");


