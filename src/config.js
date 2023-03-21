import { config } from "dotenv";
config();
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;

export const MongoAtlasUri = `mongodb+srv://${USER}:${PASSWORD}@cluster0.zuesfin.mongodb.net/prueba`;
export const SessionTimeout = 600000;
import parseArgs from "minimist";

const options = {
  alias: {
    p: "PORT",
    m: "MODE",
    c: "CONSOLE"
  },
  default: {
    PORT: 80,
    MODE: "FORK",
    CONSOLE: false
  },
};

const commandLineArgs = process.argv.slice(2);

export const { PORT, MODE, CONSOLE } = parseArgs(commandLineArgs, options);
