import pino from "pino";

const PinoLogger = {
  buildConsoleLogger: () => {
    const consoleLogger = pino();
    consoleLogger.level = "info";
    return consoleLogger;
  },

  buildWarnLogger: () => {
    const warnLogger = pino("warn.log");
    warnLogger.level = "warn";
    return warnLogger;
  },

  buildErrorLogger: () => {
    const errorLogger = pino("error.log");
    errorLogger.level = "error";
    return errorLogger;
  },
};

export default PinoLogger;
