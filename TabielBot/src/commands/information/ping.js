exports.run = (client, message, args) => {

    message.channel.send(`${message.author} Pong, meu ping é de: **${client.ws.ping}ms**.`)

} 

exports.help = {
    name: 'ping',
    aliases: ["pong"] 
}