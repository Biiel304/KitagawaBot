const Discord = require("discord.js");
const moment = require("moment");

exports.run = async (client, message, args) => {
  moment.locale("pt-BR");
  const user = message.guild.member(
    client.users.cache.get(args[0]) ||
      message.mentions.members.first() ||
      message.author
  );

  const ROLES = message.guild
    .member(user.id)
    .roles.cache.filter((r) => r.id !== message.guild.id)
    .map((roles) => roles);

  const userI = message.guild.member(user.id);

  let roles;
  if (!ROLES.length) roles = "Nenhum cargo";
  else
    roles =
      ROLES.length > 10
        ? ROLES.map((r) => r)
            .slice(0, 10)
            .join(", ") + `e mais **${ROLES.length - 10}** cargos`
        : ROLES.map((r) => r).join(", ");

  function Device(user) {
    if (!user.presence.clientStatus) return null;
    let devices = Object.keys(user.presence.clientStatus);

    let deviceList = devices.map((x) => {
      if (x == "desktop") return "PC";
      else if (x === "mobile") return "Celular";
      else return "BOT";
    });

    return deviceList.join(" - ");
  }

  let presence;
  if (!user.presence.activities.length) presence = "Não está jogando nada";
  else presence = user.presence.activities.join(", ");

  const device = Device(user);
  const joined = `${moment(userI.joinedAt).format("L")} (${moment(
    userI.joinedAt
  )
    .startOf("day")
    .fromNow()})`;
  const created = `${moment(client.users.cache.get(user.id).createdAt).format(
    "L"
  )} (${moment(client.users.cache.get(user.id).createdAt)
    .startOf("day")
    .fromNow()})`;
  const USERINFO = new Discord.MessageEmbed()

    .setAuthor(
      user.user.username,
      user.user.displayAvatarURL({ dynamic: true })
    )
    .addFields(
      { name: "Jogando:", value: `\`\`\`diff\n-${presence}\`\`\`` },
      { name: "Nome do usuário:", value: user.user.tag, inline: true },
      {
        name: "Nickname no servidor:",
        value: !!userI.nickname ? userI.nickname : "Nenhum nickname",
        inline: true,
      },
      { name: "ID do usurário:", value: user.id, inline: true },
      { name: "Conta criada em:", value: created, inline: true },

      { name: "Entrou no servidor em:", value: joined, inline: true },
      {
        name: "Acessando o Discotd pelo:",
        value: String(device).replace("null", "nenhum"),
        inline: true,
      },
      { name: "É bot?", value: user.user.bot ? "Sim" : "Não", inline: true }
    )
    .setColor(process.env.ECOLOR)
    .setTimestamp()
    .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
    .setFooter(
      `Pedido por: ${message.author.tag} || ID: ${message.author.id}`,
      message.author.displayAvatarURL({ dynamic: true })
    );

  message.quote(USERINFO);
};

exports.help = {
  name: "userinfo",
  aliases: ["uinfo"],
  description: "Comando para saber as informações de um usuario",
  usage: "<prefix>userinfo <@user>",
  category: "information"
};
