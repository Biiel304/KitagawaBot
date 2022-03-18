const { DiscordAPIError } = require("discord.js");
const Guild = require("../../database/Schemas/Guild");
const Discord = require("discord.js");
const { monthsShort } = require("moment");
exports.run = (client, message, args) => {
  
  Guild.findOne({ _id: message.guild.id }, async function (err, server) {

    if(!message.member.hasPermission("MANAGE_GUILD")) return message.quote(`${message.author} calma ai engraçadinho, você não tem permissão para usar este comando!`)

    if(args[0] == "channel") {
        
        let channel = message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()

        if(!channel) {
            return message.quote(`${message.author}, você deve mencionar o canal que deseja setar o contador de membro.`)
        } else if(channel.id == server.contador.channel) {
            return message.quote(`${message.author}, o contador já está setado nesse canal, tente novamente mencionando outro canal.`)
        } else {
            await Guild.findOneAndUpdate({_id: message.guild.id}, {$set: {'contador.channel': channel.id}})
            message.quote(`${message.author}, o contador foi setado no canal <#${server.contador.channel}> com sucesso.`)
        }
        
        return
    }

    if(args[0] == "msg") {
        
        let msg = args.slice(1).join(" ")

        if(!msg) {
            return message.quote(`${message.author}, Você não colocou nem uma mensagem.`)
        } else if (msg == server.contador.msg) {
            return message.quote(`${message.author}, essa mensagem já está setada..... Cade a criatividade migo(a)?`)
        } else if(monthsShort.length > 40) {
            return message.quote(`${message.author}, alô é da polícia? tem um espertinho querendo lotar meu banco de dados aqui!!!\n Coloque uma mensagem com menos de 40 caracteres`)
        } else {
            await Guild.findOneAndUpdate({ _id: message.guild.id },{ $set: { "contador.msg": msg, 'contador.status': true} })
            message.quote(`${message.author} a mensagem foi configurada com sucesso`)

        }

        return
    }

    if(args[0] == "help") {
      const HELPL = new Discord.MessageEmbed()
      .setAuthor(`${message.guild.name} - Sistema de Contador`, message.guild.iconURL({ dynamic: true }))
      .setColor(process.env.EOLOR)
      .setFooter(`Comando requisitado por: **${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }) )
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .addFields({
          name: "Canal setado atualmente:",
          value: server.contador.channel == "null" ? "Nenhum canal setado" : `<#${server.contador.channel}>`
        
      },{
          name: "Nessessário:",
          value: `Para setar em EMOJI é nessesspario usar **{{contador}}** na mensagem do sistema`
      },{name: "Mensagem setada",
      value: `${
        server.contador.msg == "{{contador}}"
          ? "Nenhuma mensagem setada"
          : `\`\`\`diff\n- ${server.contador.msg}\`\`\``
      }`,
      },{
        name: "Status do Sistema:",
        value: `No momento o sistema se encontra **${server.contador.status == true ? "Ativado" : "Desativado"}**`
    })

      message.quote(HELPL)

        return
    }
    })
  };

exports.help = {
  name: "contador",
  aliases: ["count"],
  description: "Comando para configurar o sistema de contador de membros",
  usage: "<prefix>contador",
  category: "Config"
};
