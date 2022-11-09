import logger from "pino";

const log = logger({
  base: { pid: false },
  transport: {
    target: "pino-pretty",
    options: {
      colorizided: true
    }
  },
  timestamp: () => `, "time": "${new Date().toLocaleString()}"`
});

export default log;
