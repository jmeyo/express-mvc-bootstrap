/**
 * Holder for the models
 */

var Sequelize = require('./sequelize/Sequelize').Sequelize, sys = require('sys'), Step = require('step');
var sql;

exports.DP = {
	
	connection: {},
	connect: function(options) {
		this.sql = new Sequelize(this.connection.name, 
								 this.connection.user,
								 this.connection.password,options);
	},	
	models: {},	
	addModel: function(modelPath, modelName) {	    				
		this.models[modelName] = this.sql.import(modelPath)[modelName];
		
	},
	dropSyncDatabase: function() {	
		
		// Disable if not development
		sql = this; // Feels like a real hack!
		sql.dropDatabase(function(errors) {			
			sql.syncDatabase();
		});
		
	}, 
	dropDatabase: function(callback) {
		this.sql.drop(callback);			
	},
	syncDatabase: function(callback) {
		this.sql.sync(callback);				
	},
	sql: null		
		
}
