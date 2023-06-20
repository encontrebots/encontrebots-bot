exports.run = async (client, message, args) => {
	if (!args[0]) return message.channel.createMessage(`:x: ${message.author.mention} **|** Mencione um bot ou dê o \`id\` de um.`);
	const { get } = require('axios');
	const user = message.mentions[0] || await client.getRESTUser(args[0]).catch(() => {
		return message.channel.createMessage(`:x: ${message.author.mention} **|** O bot não foi encontrado.`);
	});
	const uID = user.id;
	if (!uID) {
		return message.channel.createMessage(`:x: ${message.author.mention} **|** O bot não foi encontrado.`);
	}
	try {
		await get(`${process.env.DOMAIN}api/bots/${uID}`).then(async (res) => {
			const data = res.data;
			const EmbedBuilder = require('../../utils/EmbedBuilder').Embed;
			const bot = await client.getRESTUser(data.id);
			const embed = new EmbedBuilder();
			embed.setTitle(`${data.status === 'verified' ? '<:bcertified:1120450733909758002>' : '❌'} ${bot.username}`);
			embed.setColor('#3498DB');
			embed.setDescription(`**Prefixo:** ${data.prefix}\n>>> ` + data.shortDesc);
			embed.addField('Dono:', `> 👑 **${data.owner.username}#${data.owner.discriminator}**\n> 📝 **${data.owner.id}**`, true);
			embed.addField('Links:', `> 🔗 **[Website](${data.website})**\n> 🔗 **[Discord](${data.support})**`, true);
			embed.setThumbnail(data.avatar);
			message.channel.createMessage({
				content: message.author.mention,
				embeds: [embed.get()]
			});
		});
	}
	catch (e) {
		return message.channel.createMessage(`:x: ${message.author.mention} **|** O bot não foi encontrado.`);
	}
};

exports.help = {
	name: 'botinfo',
	aliases: ['bi', 'bot', 'info'],
	category: 'info',
	description: 'Mostra o ping do bot'
};