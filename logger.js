import pino from "pino";

function buildConsoleLogger() {
    const consoleLogger = pino();
    consoleLogger.level = "info";
    return consoleLogger;
}

function buildWarnLogger() {
    const warnLogger = pino("warn.log");
    warnLogger.level = "warn";
    return warnLogger;
}

function buildErrorLogger() {
    const errorLogger = pino("error.log");
    errorLogger.level = "error";
    return errorLogger;
}

export default {buildConsoleLogger, buildWarnLogger, buildErrorLogger};