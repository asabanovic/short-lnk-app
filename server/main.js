import { Meteor } from 'meteor/meteor';
import './../imports/api/users.js';
import { Links } from './../imports/api/links.js';
import './../imports/startup/simple-schema-configuration';
import { WebApp } from 'meteor/webapp';

Meteor.startup(() => {
  // code to run on server at startup

  WebApp.connectHandlers.use((req, res, next) => {
  	const _id = req.url.slice(1);
  	const link = Links.findOne({_id});
  	console.log(Links.findOne({_id}));
  	if(link) {
  		res.statusCode = 302;
  		res.setHeader('Location', link.url);
  		res.end();
  		Links.update({_id}, {
  			$inc: {
  				visitedCount: 1
  			}, 

  			$set: {
  				lastVisited: new Date().getTime()
  			}
  		})
  	} else {
  		next();
  	}

  });

  // WebApp.connectHandlers.use((req, res, next) => {
  // 	console.log('This is my new header!');
  // 	//res.setHeader('Location', 'http://google.com');
  // 	// res.statusCode = 302;
  // 	// res.end();
  // 	console.log(res);
  // });

  // const petSchema = new SimpleSchema({	
  // 		name: {
  // 			type: String
  // 		}
  // });

  // petSchema.validate({
  // 	name: 'Adnan'
  // });

  // const employeeSchema = new SimpleSchema({
  // 	name: {
  // 		type: String,
  // 		min: 1,
  // 		max: 200
  // 	},

  // 	hourlyWage: {
  // 		type: Number,
  // 		min: 1
  // 	},

  // 	email: {
  // 		type: String,
  // 		regEx: SimpleSchema.RegEx.Email
  // 	}

  // });

  // employeeSchema.validate({
  // 	name: 'Adnan',
  // 	hourlyWage: 13,
  // 	email: 'adnan@gm.com'
  // })
  // 
  

});
