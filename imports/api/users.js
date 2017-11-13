import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import {Accounts} from 'meteor/accounts-base';

Accounts.validateNewUser((user) => {

  	try {
  		console.log('This is the ', user);
	  	let email = user.emails[0].address;
	  	console.log(email);

	  	new SimpleSchema({
	  		email: {
	  			type: String,
	  			regEx: SimpleSchema.RegEx.Email
	  		}
	  	}).validate({
	  		email: email
	  	});
  	} catch(e) {
  		throw new Meteor.Error(400, e.message);
  	}
  	

  	return true;
  });