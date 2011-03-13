
/**
 * DEVELOPMENT Environment settings
 */
var	dp = require ('../lib/DataProvider').DP, express = require('express');

module.exports = {
		initialise: function(app) {
			app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));	
			dp.connection = {name:'eb',user:'root',password:'slydog'}; 
			dp.connect({disableTableNameModification: true, disableLogging: false});
		},
		dbsetup: function(app) {
			// Drop & resync any changes to the database
			dp.dropSyncDatabase();			
		}
	
}
