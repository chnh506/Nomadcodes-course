import multer from "multer";


export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Wetube";

  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {};
  next();
}

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/login");
  }
}
// 로그인 상태일 때만 실행을 허용하는 미들웨어

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
}
// 로그인하지 않은 상태일 때만 실행을 허용하는 미들웨어

export const avatarUpload = multer({ 
  dest: "uploads/avatars/", 
  limits: {
    fileSize: 3000000,
  },
});
// multer middleware, 업로드하는 파일들을 uploads/avatars/ 폴더에 저장한다.

export const videoUpload = multer({ 
  dest: "uploads/videos/", 
  limits: {
    fileSize: 100000000,
  }, 
});