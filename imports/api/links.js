import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import './../startup/simple-schema-configuration';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Links = new Mongo.Collection('links');

if(Meteor.isServer) {
	Meteor.publish('linksPub', function() {
		let user_id = this.userId;
		console.log('PRINTING: ', user_id) ;
		return Links.find({
			 userId: user_id
		});
	});
}

// links.insert  
Meteor.methods({
	'links.insert'(url) {
		if (!this.userId) {
			throw new Meteor.Error('unauthorized-user', 'Please log in');
		}

		new SimpleSchema({
			url: {
				type: String,
				regEx: SimpleSchema.RegEx.Url,
				label: 'Your link'
			}
		}).validate({
		  url: url,
		})
		
		Links.insert({
			_id: shortid.generate(),
			url,
			userId: this.userId,
			visible: true,
			visitedCount: 0,
			lastVisited: null
			
		});
	}, 

	'links.setVisibility'(_id, visible) {
		if (!this.userId) {
			throw new Meteor.Error('unauthorized-user', 'Please log in');
		}

		new SimpleSchema({
			_id: {
				type: String,
				min: 1
			},
			visible: {
				type: Boolean
			}
		}).validate({_id, visible});

		Links.update({
			_id,
			userId: this.userId
		}, {
			$set: {
				visible: visible	
			}
		});
	}
});