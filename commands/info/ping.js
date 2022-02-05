exports.run = async (client, message) => {
	message.channel.createMessage(`🏓 ${message.author.mention} **|** Pong!\nLatência: ${client.shards.random().latency}ms`);
};

exports.help = {
	name: 'ping',
	aliases: ['p', 'pong'],
	category: 'info',
	description: 'Mostra o ping do bot'
};