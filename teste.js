const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const ms = require("parse-ms");
const firebase = require("firebase");
const db = firebase.database();

module.exports = {
name: "daily",
description: "Resgate seu prêmio diário!",
aliases: ["diario", "daily"],

run: async(client, message, args) => {

  message.delete()

//==============// LETS //=============//
let user = message.author;

let daily = user.daily;

let atual = user.coins;

let coins = Math.floor(Math.random() * 5000 + 500);

let cooldown = 8.64e7;

let time = cooldown - (Date.now() - daily);

//==============// EMBED DB CRIADO //============//

const criado = new MessageEmbed()
 .setColor("#DDA0DD")
 .setTitle(`> <:black_database:882406301144059935> **__| Banco de Dados criado!__**`)
 .setDescription(`> <:black_pasta:882406446027915284> **|** *__O ${user} não tinha registro no meu banco de dados, foi criado com sucesso!__*`)

//=============// SETANDO NO BANCO //============//

if(!banco.val()) {
  db.ref(`Banco/Economia/User/${user.id}`)
.set({ pesadelos:0, daily:0 })
return message.channel.send({content: `${message.author}`, embeds: [criado]})
}

//============// COOLDOWN DAILY //===============//

    if (lastdaily !== null && cooldown - (Date.now() - lastdaily) > 0) {
      let timeobj = ms(cooldown - (Date.now() - lastdaily));

//============// EMBED COOLDOWN //==============//

const tempo = new MessageEmbed()
  .setColor("#DDA0DD")
  .setDescription(`> <:black_errado:882406364595515483> **__| Você ja coletou o daily ${user}__**
> <:black_setaCurva:882406532229247036> *__por favor espere ${timeobj.hours} horas, ${timeobj.minutes} minutos e ${timeobj.seconds} segundos!__*`)

message.channel.send({content: `${user}`, embeds: [tempo]});

} else {
//===========// UPDATE NA DB //==============//

banco.update({
  pesadelos:atual+give, 
  daily:Date.now()
  })

//===========// EMBED UPDATE //==============//

const coletado = new MessageEmbed()
  .setColor("#DDA0DD")
  .setDescription(`> <:p_pagamento:882407269017468988> *__Você resgatou seu Daily, e ganhou__* **__${give}__** *__Pesadelos! agora está com um total de **${atual+give}** Pesadelos__*`)

      message.channel.send({content: `${user}`, embeds: [coletado]})
    }
  }
}