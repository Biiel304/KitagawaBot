const Discord = require("discord.js")
exports.run = (client, message, args) => {

    if(!message.member.hasPermission("KICK_MEMBERS")) return message.quote(`${message.author}, você não pode expulsar ninguém pois, você não tem permissão para banir usuários.`)
    let member = message.guild.member(message.guild.members.cache.get(args[0]) || message.mentions.members.first())
    let reason; 
    if(!args[1]) reason = "Não informado"
    else reason = args.slice(1).join(" ")

    if(!member) {
        return message.quote(`${message.author}, você deve mencionar/inserir o ID do usuáriuo para exúlsa-lo.`)
    } else if(!member.bannable) {
        return message.quote(`${message.author}, eu não tenho permissão para exúlsar o membro..`)
    } else if(member.id == message.author.id) {
        return message.quote(`${message.author}, você não pode exúlsar a si mesmo`)
    } else {
        const KICK = new Discord.MessageEmbed()
        .setAuthor(`${message.guild.name} - Membro Banido`, message.guild.iconURL({ dynamic: true }))
        .setColor(process.env.ECOLOR)
        .setFooter(`Comando requisitado por: **${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }) )
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 2048 }))
        .addFields({
            name: "Membro",
            value: member.user.tag
        },{
            name: "ID do membro:",
            value: member.id
        },{
            name: "Quem expulsou:",
            value: message.author.tag
        },{
            name: "ID do autor:",
            value: message.author.id
        },{
            name: "Motivo do kick:",
            value: reason
        })
  
        message.quote(KICK)

        
        member.kick({ reason: reason})
    }
    
  };
  
  exports.help = {
    name: "kick",
    aliases: ["expulsar"],
    description: "Comando para expulsar algum membro do seu servidor",
    usage: "<prefix>kick <@user> motivo",
    category: "Moderation"
  };
  