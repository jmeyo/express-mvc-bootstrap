/**
 *  Bob schema
 *  Created by create-model script  
 **/
 
exports.getBobClass = function(Sequelize, sequelize) {
	
  var Bob = sequelize.define("Bob", {	 
	name: Sequelize.STRING
  });
  
}