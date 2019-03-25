const Sequelize = require('sequelize');
import config from './dbconfig';

export const dbsequelize = new Sequelize(config.database, config.username, config.password, {
	host: config.host,
	dialect: config.dialect,
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	}
});