/**
 * Module dependencies.
 */
var fs = require('fs'),
	express = require('express'),
	// mongoose = require('mongoose'),
	sys = require('sys'),
	sql = require('sequelize'),	
	nodepath = require('path'),
	dp = require ('./lib/DataProvider').DP;

var path = __dirname;
var app;

/**
 * Initial bootstrapping
 */
exports.boot = function(params){
	
  //Create our express instance
  app = express.createServer();	  
  
  // Import configuration
  var config = require(path + '/conf/configuration.js');
  config.initialise(app);
  
  // Bootstrap application
  bootApplication(app);
  bootModels(app);
  bootControllers(app);
  
  // Close off database setup
  config.dbsetup(app);
  
  return app;
  
};

/**
 *  App settings and middleware
 *  Any of these can be added into the by environment configuration files to 
 *  enable modification by env.
 */

function bootApplication(app) {	 
   
   // launch
  // app.use(express.logger({ format: ':method :url :status' }));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'helloworld' }));
  app.use(express.static(path + '/public'));  // Before router to enable dynamic routing
  app.use(app.router);

  /* Example 500 page
  app.error(function(err, req, res){
    res.render('500',{error:err});
  });*/
  
  // Example 404 page via simple Connect middleware
  app.use(function(req, res){
    res.render('404');
  });

  // Setup ejs views as default, with .html as the extension
  app.set('views', path + '/views');
  app.register('.html', require('ejs'));
  app.set('view engine', 'html');

  // Some dynamic view helpers
  app.dynamicHelpers({
  
	request: function(req){
	   return req;
	},
	    
	hasMessages: function(req){
      return Object.keys(req.session.flash || {}).length;
    },

    messages: function(req){
      return function(){
        var msgs = req.flash();
        console.log(msgs);
        return Object.keys(msgs).reduce(function(arr, type){
          return arr.concat(msgs[type]);
        }, []);        
      }
    }
  });
}

//Bootstrap models 
function bootModels(app) {
	
	var files = fs.readdirSync(path + '/models');
    files.forEach(function(file){
   	    var name = file.replace('.js', '');
   	    if(name != 'README') {
   			dp.addModel(path + '/models/'+ name,name);
   	    }
    });
    
}

// Bootstrap controllers
function bootControllers(app,dp) {
  require(path + '/controllers/AppController')(app);			// Include core router  
}
