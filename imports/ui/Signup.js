import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

export default class Signup extends React.Component {
	
	componentWillMount() {
		console.log('Component Will mount in Signup!!');
		console.log(Meteor.userId());
		//this.props.history.push('/');
		if (Meteor.userId()) {
			this.props.history.push('/links')
		}
	}

	constructor(props) {
		super(props);
		console.log(props);
		this.state = {
			error: ''
		};
	}

	onSubmit(e){
		e.preventDefault();
		let email = this.refs.email.value;
		let password = this.refs.email.value;

		if (password.length < 3) {
			console.log(password.length);
			this.setState({ error: 'Password has to be longer than 3 characters' });
			return false;
		}

		Accounts.createUser({email, password}, (err) => {
			console.log('Signup callback: ', err);
			if (err) {
				this.setState({error: err.reason});
			} else {
				this.setState({error: ''});
			}
		})
		console.log(this.refs);
		console.log(e.target.email.value);
	}

	render() {
		return (
			<div className="boxed-view">
				<div className="boxed-view__box">
					<h1>Sign Up </h1>
					{this.state.error ? <p>{this.state.error}</p> : undefined}
					<form onSubmit={this.onSubmit.bind(this)}>
						<input type="text" ref="email" placeholder="Email" name="email" />
						<input type="password" ref="password" placeholder="Password" name="password" />
						<button className="button" type="submit">Create</button>
					</form>
					<Link to="/">Already have an account?</Link>
				</div>
			</div>
		);
	}
}