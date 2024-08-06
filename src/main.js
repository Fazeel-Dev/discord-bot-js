const { Client, GatewayIntentBits, Events, Collection } = require('discord.js');
const {
	registerClientEvents,
} = require('./discord/handlers/registerClientEvents');

const client = new Client({
	intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();

console.log('Registering Events');
registerClientEvents(client);

module.exports = { client };
