
/**
 * Default configuration manager
 * Inject app and express reference
 */

module.exports = {
		
		initialise: function(app) {		

			// DEVELOPMENT
			app.configure('development', function() {
			  var configuration = require("./development.js");
			  configuration.initialise(app);
			});
		
			// TEST
			app.configure('test', function() {
				var configuration = require("./test.js");
			    configuration.initialise(app);
			});
			
			// PRODUCTION
			app.configure('production', function() {
				var configuration = require("./production.js");
				configuration.initialise(app);
			});				
		},
		dbsetup: function(app) {
			
			// DEVELOPMENT
			app.configure('development', function() {
			  var configuration = require("./development.js");
			  configuration.dbsetup(app);
			});
		
			// TEST
			app.configure('test', function() {
				var configuration = require("./test.js");
			  configuration.dbsetup(app);
			});
			
			// PRODUCTION
			app.configure('production', function() {
				var configuration = require("./production.js");
				configuration.dbsetup(app);
			});					
		}

}
