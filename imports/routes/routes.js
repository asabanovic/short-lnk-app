import { Meteor } from 'meteor/meteor';
import React from 'react';
import Signup from './../ui/Signup';
import Link from './../ui/Link';
import NotFound from './../ui/NotFound';
import Login from './../ui/Login';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

export const onAuthChange = (isAuthenticated) => {
	console.log('isAuthenticated', isAuthenticated);

	const pathname = history.location.pathname;
	console.log(pathname);
	console.log(authenticatedPages.includes(pathname));
	if (isAuthenticated && unauthenticatedPages.includes(pathname)) {
		console.log('replacing with links');
		return history.replace('/links')
	} else if (!isAuthenticated && authenticatedPages.includes(pathname)) {
		console.log('replacing with /');
		return history.replace('/');
	}
}

export const routes = (
	<Router history={ history }>
		<Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/links" component={Link}/>
          <Route path="*" component={NotFound}/>
        </Switch>
    </Router>
);