import { Router } from "express";
import passport from "passport";

const loginRouter = Router();

loginRouter.get("/", (_req, res) => {
  res.redirect("/home");
});

loginRouter.get("/register", checkNotAuthenticated, (_req, res) => {
  res.render("pages/register");
});

loginRouter.post(
  "/register",
  checkNotAuthenticated,
  passport.authenticate("register", {
    failureRedirect: "/registerfailure",
    successRedirect: "/login",
    session: false,
  })
);

loginRouter.get("/registerfailure", checkNotAuthenticated, (_req, res) => {
  res.render("pages/registerfailure");
});

loginRouter.get("/login", checkNotAuthenticated, (_req, res) => {
  res.render("pages/login.hbs");
});

loginRouter.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("login", {
    successRedirect: "/home",
    failureRedirect: "/loginfailure",
  })
);

loginRouter.get("/loginfailure", checkNotAuthenticated, (_req, res) => {
  res.render("pages/loginfailure");
});

loginRouter.get("/home", checkAuthenticated, (req, res) => {
  req.session.counter++;
  res.render("pages/home", { user: req.session.passport.user.username });
});

loginRouter.get("/logout", checkAuthenticated, (req, res) => {
  try {
    const name = req.session.passport.user.username
      ? req.session.passport.user.username
      : "";
    req.session.destroy();
    res.render("pages/logout", { mensaje: `Hasta luego ${name}` });
  } catch (error) {
    console.log(error);
  }
});

export function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    next();
  }
}

export default loginRouter;
