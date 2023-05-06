import { Router } from "express";
import passport from "passport";
const loginRouter = Router();

loginRouter.post(
  "/register",
  checkNotAuthenticated,
  passport.authenticate("register", {
    session: false,
  }),
  (_req, res) => {
    res.json("Succesful registration");
  }
);

loginRouter.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("login"),
  (req, res) => {
    if (req.isAuthenticated()) res.json("Succesful login");
    else res.json("Login failure");
  }
);

loginRouter.get("/logout", checkAuthenticated, (req, res) => {
  try {
    const name = req.session.passport.user.username
      ? req.session.passport.user.username
      : "";
    req.session.destroy();
    res.json({ event: "logout", username: name });
  } catch (error) {
    console.log(error);
  }
});

export function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.json("Not authenticated");
  }
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    res.json("Already authenticated");
  } else {
    next();
  }
}

export default loginRouter;
