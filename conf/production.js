
/**
 * TEST Environment settings
 */

var	dp = require ('../lib/DataProvider').DP, express = require('express');

module.exports = {
		initialise: function(app) {
			app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));	
			dp.connection = {name:'eb_production',user:'root',password:'slydog'}; 
			dp.connect({disableTableNameModification: true, disableLogging: true});
		},
		dbsetup: function(app) {
			// DO NOTHING!
		}
	
}
