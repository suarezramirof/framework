import { create } from "express-handlebars";

// __dirname

import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const hbs = create({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "./../../public/views/layouts",
    partialsDir: __dirname + "./../../public/views/layouts",
  });

  export default hbs;