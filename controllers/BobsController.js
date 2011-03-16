
/**
 *  Bobs Controller
 *  Created by create-controller script @ Wed Mar 16 2011 14:31:57 GMT+0000 (GMT)
 **/
 var dp = require ('../lib/DataProvider').DP;
	 pager = require('../utils/pager.js'),
	 sys = require('sys');
	 ViewTemplatePath = 'bobs';

/**
 * Import our model definitions
 */
var Bob = dp.models.Bob;
	 
module.exports = {

	/**
	 * Index action, returns a list either via the views/bobs/index.html view or via json
	 * Default mapping to GET '/bobs'
	 * For JSON use '/bobs.json'
	 **/
	index: function(req, res, next) {
		  	 
		  var from = req.params.from ? parseInt(req.params.from) - 1 : 0;
		  var to = req.params.to ? parseInt(req.params.to) : 10;
	      var total = 0;
	      	      
	      Bob.count(function(count) {
	    	  
	    	  // projects will be an array of all Project instances
	    	  var pagerHtml = pager.render(from,to,count,'/bobs');
	   	     
		      Bob.findAll({limit: from + ", " + to, order:'name asc'},function(bobs) {
		    	  // projects will be an array of all Project instances
			      switch (req.params.format) {
			        case 'json':	          
			          res.send(bobs);
			          break;
			        default:			        	
			        	res.render(ViewTemplatePath,{bobs:bobs,pagerHtml:pagerHtml});
			      }
		
		      });

	      });
	      	     	      	  	
	},
	
	/**
	 * Show action, returns shows a single item via views/bob/show.html view or via json
	 * Default mapping to GET '/bob/:id'
	 * For JSON use '/bob/:id.json'
	 **/
	show: function(req, res, next) {	  		  
			
		  Bob.find({ id: req.params.id }, function(bob) {
			  
		      switch (req.params.format) {
		        case 'json':
		          res.send(bob);
		          break;
	
		        default:
		        	res.render(ViewTemplatePath + "/show",{bob:bob});
		      }
		      
		  });
		      
	},
	
	/**
	 * Edit action, returns a form via views/bob/edit.html view no JSON view.
	 * Default mapping to GET '/bob/:id/edit'
	 **/
	edit: function(req, res, next){
		  Bob.find({ id: req.params.id }, function(bob) {			  
			  res.render(ViewTemplatePath + "/edit",{bob:bob});
		});
	},
	  
	/**
	 * Update action, updates a single item and redirects to Show or returns the object as json
	 * Default mapping to PUT '/bob/:id', no GET mapping	 
	 **/  
	update: function(req, res, next){
	    
		Bob.find({ id: req.params.id }, function(bob) {
			
	    	bob.name = req.body.bob.name;
	    	
	    	bob.save(function(bob) {
	        	
	          switch (req.params.format) {
	            case 'json':
	              res.send(bob);
	              break;
	            default:
	              req.flash('info', 'Bob updated');
	              res.redirect('/bob/' + req.params.id);
	          }
	        });
	      });
	},
	  
	/**
	 * Create action, creates a single item and redirects to Show or returns the object as json
	 * Default mapping to POST '/bobs', no GET mapping	 
	 **/  
	create: function(req, res, next){
		  

		  var bob = new Bob(req.body.bob);
		  
			bob.save(function(bob) {
	        	
	          switch (req.params.format) {
	            case 'json':
	              res.send(bob);
	              break;
	            default:
	              req.flash('info', 'Bob created!');
	              res.redirect('/bob/' + bob.id);
	          }
	          
	        });
		  
	},
	/**
	 * Delete action, deletes a single item and redirects to index
	 * Default mapping to DEL '/bob/:id', no GET mapping	 
	 **/
	destroy: function(req, res, next){
		  
		Bob.find({ id: req.params.id }, function(bob) {
		        
				bob.destroy(function() {
	    		    req.flash('info','Bob deleted');
	    			res.send('true');	    		      	          
	   	      	});
				
		  });
		  
	}

};