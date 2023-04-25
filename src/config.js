import { config } from "dotenv";
import path from "path";
import parseArgs from "minimist";
config({
  path: path.resolve(process.cwd(), process.env.NODE_ENV + ".env")
});
const USER = process.env.USER_NAME;
const PASSWORD = process.env.PASSWORD;

export const MongoAtlasUri = `mongodb+srv://${USER}:${PASSWORD}@cluster0.zuesfin.mongodb.net/prueba`;
export const SessionTimeout = 600000;

const options = {
  alias: {
    p: "PORT",
    m: "MODE",
    db: "DATABASE",
  },
  default: {
    PORT: process.env.PORT || 8080,
    MODE: "FORK",
    DATABASE: process.env.DB || "MEMORY",
  },
};

const commandLineArgs = process.argv.slice(2);

const { PORT, MODE, DATABASE } = parseArgs(commandLineArgs, options);

export default { PORT, MODE, DATABASE, HOST: process.env.HOST || "localhost" };
