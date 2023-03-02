import { config } from "dotenv";
config();
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;

export const MongoAtlasUri = `mongodb+srv://${USER}:${PASSWORD}@cluster0.zuesfin.mongodb.net/prueba`;
export const SessionTimeout = 600000;
