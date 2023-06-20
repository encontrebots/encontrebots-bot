exports.run = async (client, message, args) => {
	const config = require('../../config/config');
	if (!message.member.roles.includes(config.roles.admin) && !message.member.roles.includes(config.roles.mod)) return message.channel.createMessage(`:x: ${message.author.mention} **|** Você não tem permissão para usar este comando.`);
	if (!args[0]) return message.channel.createMessage(`:x: ${message.author.mention} **|** Mencione um bot ou dê o \`id\` de um.`);
	const { post, get } = require('axios');
	const user = message.mentions[0] || await client.getRESTUser(args[0]).catch(() => {
		return message.channel.createMessage(`:x: ${message.author.mention} **|** O bot não foi encontrado.`);
	});
	const guild = await client.getRESTGuild(config.guild);
	const uID = user.id;
	try {
		const res = await get(`${process.env.DOMAIN}api/bots/${uID}`);
		const data = res.data;
		await post(`${process.env.DOMAIN}api/bots/${uID}/delete`, {
			headers: {
				'Authorization': process.env.APIKEY
			}
		}).then(async () => {
			const logs = await client.getRESTChannel(config.logs);
			await logs.createMessage(`🗑️ <@${data.owner.id}> **|** O bot **${user.username}** foi deletado. [${message.author.mention}]`);
			await guild.kickMember(user.id, 'Bot deletado').catch(() => {});
			await client.removeGuildMemberRole(message.guildID, data.owner.id, config.roles.dev).catch(() => {});
		});
	}
	catch (e) {
		return message.channel.createMessage(`:x: ${message.author.mention} **|** O bot não foi encontrado.`);
	}
	message.addReaction('✅');
};

exports.help = {
	name: 'delete',
	aliases: ['del', 'deletebot', 'delbot', 'deleteb', 'delb', 'deletarbot', 'deletarb', 'deletar'],
	category: 'info',
	description: 'Mostra o ping do bot'
};