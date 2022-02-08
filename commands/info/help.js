exports.run = async (client, message) => {
    const EmbedBuilder = require('../../utils/EmbedBuilder').Embed;
    const embed = new EmbedBuilder();
    embed.setTitle("Comandos BDD");
    embed.setColor('#3498DB');
    embed.setDescription(`**botinfo** - Mostra informações de um bot na botlist!\n**ping** - Mostra o ping do bot!`);
    embed.setFooter("Adg é gay")
    message.channel.createMessage({
        content: message.author.mention,
        embeds: [embed.get()]
    });

};

exports.help = {
    name: 'help',
    aliases: ['ajuda'],
    category: 'info',
    description: 'Mostra os comandos do bot!'
};
