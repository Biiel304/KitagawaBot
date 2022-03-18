const Guild = require("../../database/Schemas/Guild");
const User = require("../../database/Schemas/User");
const GetMention = (id) => RegExp(`^<@!?${id}>( |)$`);

module.exports = async (client, message) => {
  try {
    Guild.findOne({ _id: message.guild.id }, async function (err, server) {
      User.findOne({ _id: message.author.id }, async function (err, user) {
        if (message.author.bot == true) return;
        if (server) {
          if (user) {
            var prefix;
            prefix = server.prefix;
            
            if (message.content.match(GetMention(client.user.id))) {
              message.channel.send(
                `Olá, ${message.author}, o meu prefixo neste servidor é **${prefix}**.`
              );
            }

            let xp = user.Exp.xp;
            let level = user.Exp.level;
            let nextLevel = user.Exp.nextLevel * level;

            if(user.Exp.id = "null") {
              await User.findOneAndUpdate({_id: message.author.id}, {$set: {'Exp.id': message.author.id}})
            }

            let xpGive = Math.floor(Math.random() * 5) + 1;

            await User.findOneAndUpdate({_id: message.author.id}, {$set: {'Exp.xp': xp +xpGive, "Exp.user": message.author.tag}})

            if (xp >= nextLevel) {
              await User.findOneAndUpdate({_id: message.author.id}, {$set: {'Exp.xp': 0, 'Exp.level': level +1}})
              message.channel.send(`Parabéns ${message.aurhor}! Você subiu para o nivel **${level +1}**`)
              message.react("🆙")

            }

            if (message.content.indexOf(prefix) !== 0) return;
            let messageArray = message.content.split(" ");
            let cmd = messageArray[0];
            let args = messageArray.slice(1);
            let cmdFile =
              client.commands.get(cmd.slice(prefix.length)) ||
              client.commands.get(client.aliases.get(cmd.slice(prefix.length)));

            if (cmdFile) {
              return cmdFile.run(client, message, args);
            }
          } else {
            Guild.create({ _id: message.guild });
          }
        } else {
          User.create({ _id: message.author.id });
        }
      });
    });
  } catch (err) {
    if (err) console.error(err);
  }
};
