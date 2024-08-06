const {
	Client,
	GatewayIntentBits,
	REST,
	Collection,
	Routes,
} = require('discord.js');
const config = require('./config/configuration');
const {
	registerClientEvents,
} = require('./discord/utils/registerClientEvents');
const { loadCommands } = require('./discord/utils/loadCommands');

const client = new Client({
	intents: [GatewayIntentBits.Guilds],
});
const rest = new REST({ version: '10' }).setToken(config.bot.token);

client.commands = new Collection();

console.log('Loading Commands');
const commands = loadCommands(client);

console.log('Registering the loaded commands');
(async () => {
	try {
		console.log(
			`Started registering ${commands.length} application (/) commands.`
		);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(
				config.bot.clientId,
				config.discord.guildId
			),
			{ body: commands }
		);

		console.log(
			`Successfully registered ${data.length} application (/) commands.`
		);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();

console.log('Registering Events');
registerClientEvents(client);

module.exports = { client };
