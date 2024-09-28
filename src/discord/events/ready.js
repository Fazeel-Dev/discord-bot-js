const { Events, ActivityType } = require('discord.js');
const { CustomLogger } = require('../../shared/customLogger');

const logger = new CustomLogger(__filename);

module.exports = {
	name: Events.ClientReady,
	label: 'On Ready',
	once: true,
	execute(client) {
		logger.log(`Ready! Logged in as ${client.user.tag}`);

		client.user.setPresence({
			activities: [
				{
					name: 'Iam alive',
					type: ActivityType.Custom,
				},
			],
		});
	},
};
