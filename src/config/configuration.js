const env = process.env;

const config = {
	bot: {
		token: env.BOT_TOKEN,
		clientId: env.CLIENT_ID,
	},
	discord: {
		guildId: env.GUILD_ID,
	},
	colors: {
		primary: '#ff002b',
	},
	embeds: {
		error: {
			color: '#ff002b',
			title: 'Error',
			description: 'An error has occurred. Please try again later.',
		},
		success: {
			color: '#00ff00',
			title: 'Success',
		},
	},
};

module.exports = config;
