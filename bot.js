require('./server');
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
const glob = require('glob');

client.commands = new Collection();
client.aliases = new Collection();

glob(__dirname + '/commands/*/*.js', function(er, files) {
	if(er) console.log(er);
	files.forEach(f => {
		let props = require(`${f.replace('.js', '')}`);
		client.commands.set(props.help.name, props);
		props.help.aliases.forEach(alias => {
			client.aliases.set(alias, props.help.name);
		});
	});
	console.log('[COMANDOS] Carregados com sucesso'.brightCyan);
});

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
		message.channel.createMessage(`🏓 ${message.author.mention} **|** Olá, meu prefixo é \`${config.prefix[0]}\`!`);
	}
	const regexPrefix = new RegExp(`^(${config.prefix.map(prefix => prefix.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')).join('|')}|<@!?${client.user.id}>)( )*`, 'gi');
	if (!message.content.match(regexPrefix)) return;
	const args = message.content.replace(regexPrefix, '').trim().split(/ +/g);
	let cmd = args.shift().toLowerCase();

	const prefix = regexPrefix;

	let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
	if (!command) return;
	if(command.help.status === 'off') return;
	if (command) {
		command.run(client, message, args, prefix);
	}
	else {
		console.log();
	}
});

client.connect();