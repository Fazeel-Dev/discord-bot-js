const path = require('path');
const fs = require('fs');
const { CustomLogger } = require('../../shared/customLogger');

const logger = new CustomLogger(__filename);

const eventsPath = path.join(__dirname, '../events');
const eventFiles = fs
	.readdirSync(eventsPath)
	.filter((file) => file.endsWith('.js'));

/**
 * Method to register client events
 * @param {*} client
 */
module.exports.registerClientEvents = (client) => {
	try {
		for (const file of eventFiles) {
			const filePath = path.join(eventsPath, file);
			const event = require(filePath);
			if (event.once) {
				client.once(event.name, (...args) => event.execute(...args));
			} else {
				client.on(event.name, (...args) => event.execute(...args));
			}
			logger.log('Loaded event: ', event.label);
		}
	} catch (error) {
		logger.error('An Error occured', error);
	}
};
