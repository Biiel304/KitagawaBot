const {APIMessage, Message} = require("discord.js");
const Discord = require("discord.js");
const client = new Discord.Client();
const logger = require("./src/utils/logger.js");
const mongoose = require("mongoose");
const ms = require("moment");
require("dotenv").config();

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

const modules = ["information", "Config", "Economia", "owner", "Moderation"];
const fs = require("fs");
const dbIndex = require("./src/database/index.js");
dbIndex.start();

modules.forEach((x) => {
  fs.readdir(`./src/commands/${x}/`, (err, files) => {
    if (err) return logger.error(err);
    logger.sucess(
      `(COMANDOS) Foram carregados ${files.length} comando(s) na pasta ${x}`
    );

    files.forEach((f) => {
      const props = require(`./src/commands/${x}/${f}`);
      client.commands.set(props.help.name, props);
      props.help.aliases.forEach((alias) => {
        client.aliases.set(alias, props.help.name);
      });
    });
  });
});

fs.readdir("./src/client/events/", (err, files) => {
  if (err) return logger.error(err);
  files.forEach((file) => {
    const event = require(`./src/client/events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./src/client/events/${file}`)];
    logger.sucess(`(EVENTOS): ${eventName} Carregado.`);
  });
});

Message.prototype.quote = async function (content, options) {
  const message_reference = {
    message_id: (
      !!content && !options
        ? typeof content === 'object' && content.messageID
        : options && options.messageID
    ) || this.id,
    message_channel: this.channel.id
  }

  const allowed_mentions = {
    parse: ['users', 'roles', 'everyone'],
    replied_user: typeof content === 'object' ? content && +content.mention : options && +options.mention
  }

  const { data: parsed, files } = await APIMessage
    .create(this, content, options)
    .resolveData()
    .resolveFiles()

  return this.client.api.channels[this.channel.id].messages.post({
    data: { ...parsed, message_reference, allowed_mentions },
    files
  })
  .then(d => this.client.actions.MessageCreate.handle(d).message)
}

client.login(process.env.TOKEN).then(() => {
  logger.sucess(`(BOT): Index carregado com sucesso!`);
});
