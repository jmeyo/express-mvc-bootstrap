
/**
 *  Bobs Unit Test
 *  Created by create-test script @ Wed Mar 16 2011 14:32:12 GMT+0000 (GMT)
 **/

var     should = require('should')
	  , dp = require ('../../lib/DataProvider').DP;

/**
 * Initialise the data provider
 */
dp.connect(); // Fake connection
dp.addModel('../../models/Bob','Bob');

/**
 * Simple expresso tests for the Bob model
 */
module.exports = {
		    
  'Test that a model can be created': function(){
	    var Bob = dp.models.Bob;
	    var model = new Bob({name:'I am an example!'});
	    model.name.should.not.be.null;    
   }

};