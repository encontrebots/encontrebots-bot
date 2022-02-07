
exports.run = async (client, message, args) => {

const EmbedBuilder = require('../../utils/EmbedBuilder').Embed;
			
			const embed = new EmbedBuilder();
			embed.setTitle();
			embed.setColor('#3498DB');
			embed.setDescription(``);
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
