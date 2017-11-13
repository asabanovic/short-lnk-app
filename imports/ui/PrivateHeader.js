import React from 'react';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';


// export default class PrivateHeader extends React.Component {
// 	onLogout(){ 
// 		console.log(this.props);

// 		Meteor.logout();
// 		console.log('Logging out and pushing to home');
// 		this.props.history.replace('/');
// 	}
// 	render(){
// 		return (
// 			<div>
// 				<h1>{this.props.title}</h1>
// 				<p>This is a link!</p>
// 				<button onClick={this.onLogout.bind(this)}>Log Out</button>
// 			</div>
// 		)
// 	}
// }

export default PrivateHeader = (props) => {
	return (
		<div className="header">
			<div className="header__inner">
				<h1 className="header__title">{props.title}</h1>
				<a className="header__link" onClick={() => Meteor.logout()}>Log Out</a>
			</div>
		</div>
	);
}

PrivateHeader.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  title: PropTypes.string.isRequired,
};