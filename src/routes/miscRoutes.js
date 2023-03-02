import { Router } from "express";
import { fork } from "child_process";
export const infoRouter = Router();
export const randomNumberRouter = Router();

infoRouter.get("/", (_req, res) => {
  const args = process.argv;
  const os = process.platform;
  const node = process.version;
  const mem = process.memoryUsage().rss;
  const id = process.pid;
  const dir = process.cwd();
  const path = process.execPath;

  res.render("pages/info", { args, os, node, mem, path, id, dir });
});

randomNumberRouter.get("/randoms", (req, res) => {
  const qty = req.query.cant || 100000000;
  const randoms = fork(`random.js`);
  randoms.send(`${qty}`);
  randoms.on("message", (obj) => {
    res.json(obj);
  });
});
