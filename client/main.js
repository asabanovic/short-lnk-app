import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import {routes, onAuthChange } from './../imports/routes/routes.js';
import { Tracker } from 'meteor/tracker';
import './../imports/startup/simple-schema-configuration';
import { Session } from 'meteor/session'

Meteor.startup(() => {
	Session.set('visibility', true);
	ReactDOM.render(routes, document.getElementById('app'));
});

Tracker.autorun(() => {
	console.log('VISIBILITY:', Session.get('visibility'));
	const isAuthenticated = !!Meteor.userId();
	onAuthChange(isAuthenticated);
});