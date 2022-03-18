const { MessageEmbed } = require("discord.js");
const Guild = require("../../database/Schemas/Guild");

exports.run = async(client, message, args) => {
    Guild.findOne({ _id: message.guild.id }, async function (err, server) {

const Config = []
const Economia = []
const information = []
const Moderation = []
const owner = []

const { commands } = message.client

const AJUDA = new MessageEmbed()
.setAuthor(`${message.author.username}`,message.author.displayAvatarURL({ dynamic: true })
  )
.setColor("#fb00ff")
.setTimestamp()
.setFooter(
    `Comando requisitado  por ${message.author.username}`,
    message.author.displayAvatarURL({ dynamic: true })
  )


if(args[0]) {
    const name = args[0].toLowerCase()
    const comando = commands.get(name) || commands.find((cmd) => cmd.help.aliases && cmd.help.aliases.includes(name))

    if(!comando) {
        return message.quote(`${message.author}, não consegui encontrar nem um comando com o nome **\`${name}\`**.`)
    }

    AJUDA.addField( `Comando:`,  comando.help.name)

    if(comando.help.aliases)
    AJUDA.addField( `Aliases:`,  comando.help.aliases.join(", "))

    if(comando.help.description)
    AJUDA.addField( `Descrição:`,  comando.help.description)
    
    if(comando.help.usage)
    AJUDA.addField( `Modo de usar:`,  comando.help.usage)

    message.quote(AJUDA)
} else {

const HELP = new MessageEmbed()
.setColor("#fb00ff")
.setTimestamp()
.setDescription(`**${message.author.username}**, lista de todos os meus comandos. \n caso queira saber mais sobre algum use **${server.prefix}help <comando>**.`)

commands.map((cmd) => {
    if(cmd.help.category === "Config")
    Config.push(cmd.help.name)
    
    else if(cmd.help.category === "Economia")
    Economia.push(cmd.help.name)
    
    else if(cmd.help.category === "information")
    information.push(cmd.help.name)
    
    else if(cmd.help.category === "Moderation")
    Moderation.push(cmd.help.name)

    else if(cmd.help.category === "owner")
    owner.push(cmd.help.name)

})

HELP.addFields(
    {name: "Configuração", value: Config.map((x) => `\`${x}\``).join(", ")},
    {name: "Econimia", value: Economia.map((x) => `\`${x}\``).join(", ")},
    {name: "Informações", value: information.map((x) => `\`${x}\``).join(", ")},
    {name: "Moderação", value: Moderation.map((x) => `\`${x}\``).join(", ")}
)
    message.quote(HELP)
}



})
}

exports.help = {
    name: "help",
    aliases: ["ajuda"],
    description: "Comando para listar todos os comandos do bot",
    usage: "<prefix> help",
    category: "information"
  };
  