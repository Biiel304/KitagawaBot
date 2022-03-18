const mongoose = require("mongoose");
const logger = require("../utils/logger");

module.exports = {
  start() {
    try {
      mongoose.connect(process.env.DATABASE_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      logger.sucess(`(DATABASE) - Conectado ao banco de dados.`);
    } catch (err) {
      if (err) return logger.error(`(DATABASE) - ERRO:`, +err);
    }
  },
};
