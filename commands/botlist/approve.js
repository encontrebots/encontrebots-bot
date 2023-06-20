exports.run = async (client, message, args) => {
	const config = require('../../config/config');
	if (!message.member.roles.includes(config.roles.admin) && !message.member.roles.includes(config.roles.mod)) return message.channel.createMessage(`:x: ${message.author.mention} **|** Você não tem permissão para usar este comando.`);
	if (!args[0]) return message.channel.createMessage(`:x: ${message.author.mention} **|** Mencione um bot ou dê o \`id\` de um.`);
	const { post } = require('axios');
	const user = message.mentions[0] || await client.getRESTUser(args[0]).catch(() => {
		return message.channel.createMessage(`:x: ${message.author.mention} **|** O bot não foi encontrado.`);
	});
	const uID = user.id;
	try {
		await post(`${process.env.DOMAIN}api/bots/${uID}/approve`, {
			headers: {
				'Authorization': process.env.APIKEY
			}
		}).then(async () => {
			await message.addReaction('✅');
		});
	}
	catch (e) {
		return message.channel.createMessage(`:x: ${message.author.mention} **|** O bot não foi encontrado.`);
	}
};

exports.help = {
	name: 'approve',
	aliases: ['aprovar', 'app', 'aceitar', 'aceitarbot', 'aceitarb', 'aprovarbot', 'aprovarb'],
	category: 'info',
	description: 'Mostra o ping do bot'
};