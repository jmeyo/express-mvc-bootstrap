
/**
 * TEST Environment settings
 */

var	dp = require ('../lib/DataProvider').DP, express = require('express');

module.exports = {
		initialise: function(app) {
			app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));	
			dp.connection = {name:'ebtest',user:'root',password:'slydog'}; 
			dp.connect({disableTableNameModification: true, disableLogging: true});
		},
		dbsetup: function(app) {
			// Only create schema in test - this basically assumes you manage
			// the schema yourself in test, but it means it will work the first time
			// Provided the database exists
			dp.syncDatabase();			
		}
	
}
