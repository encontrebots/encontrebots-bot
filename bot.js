require('dotenv').config();
const config = require('./config');
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

client.connect();