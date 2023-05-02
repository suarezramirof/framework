import { Router } from "express";
import { fork } from "child_process";
import { cpus } from "os";
import compression from "compression";
export const infoRouter = Router();
export const randomNumberRouter = Router();

infoRouter.get("/", showInfo);
infoRouter.get("/gzip", compression(), showInfo);

function showInfo(_req, res) {
  const info = getInfo();
  return res.render("pages/info", info);
}

function getInfo() {
  const args = process.argv.slice(2);
  const os = process.platform;
  const node = process.version;
  const mem = process.memoryUsage().rss;
  const id = process.pid;
  const dir = process.cwd();
  const path = process.execPath;
  const numCpus = cpus().length;
  return { args, os, node, mem, path, id, dir, numCpus };
}

randomNumberRouter.get("/randoms", (req, res) => {
  const qty = req.query.cant || 100000000;
  const randoms = fork(`random.js`);
  randoms.send(`${qty}`);
  randoms.on("message", (obj) => {
    res.json(obj);
  });
});
