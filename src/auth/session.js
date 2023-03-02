import session from "express-session";
import MongoStore from "connect-mongo";
import { MongoAtlasUri, SessionTimeout } from "../config.js";
const sessionMiddleware = session({
  store: MongoStore.create({
    mongoUrl: MongoAtlasUri,
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
  }),
  secret: "miapp",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: SessionTimeout,
  },
});

export default sessionMiddleware;
