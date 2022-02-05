require('colors');
require('dotenv').config();
const config = require('./config/config');
const {
	Client,
	Collection
} = require('eris');
const client = new Client(config.token, {
	restMode: true,
	intents: ['all']
});

client.commands = new Collection();
client.aliases = new Collection();

client.on('ready', () => {
	console.log(`[LOGIN] Pronto em ${client.user.username}#${client.user.discriminator} (${client.user.id})`.green);
	client.editStatus('dnd', {
		game: client.user.username,
		name: 'Bots de Discord',
		type: 5
	});
});

client.on('messageCreate', async message => {
	if (message.author.bot) return;
	if (message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) {
		message.channel.createMessage(`🏓 ${message.author.mention} **|** Olá, meu prefixo é \`${config.prefix}\`!`);
	}
});

client.connect();