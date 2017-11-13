import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import {Meteor} from 'meteor/meteor';
import moment from 'moment';

export default class LinksListItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			justClicked: false,
		}	
		console.log(moment.unix(this.props.lastVisited).format("MM/DD/YYYY"));	
	}

	componentDidMount() {
		console.log('REFS: ', this.refs.copy);
		this.clipboard = new Clipboard(this.refs.copy);
		this.clipboard.on('success', function(e) {
			//alert('Success!');
			this.setState({justClicked:true});

			setTimeout(function(){
				this.setState({justClicked: false});
			}.bind(this),1000);
		}.bind(this)).on('error', function(e){
			alert('Error!');
		});


	}

	componentWillUnmount() {
		this.clipboard.destroy();
	}

	displayValue(){
		if (this.state.justClicked == false) {
			return 'COPY';
		}

		if (this.state.justClicked == true) {
			return 'COPYING';
		}
	}

	setVisibility(props) {
		console.log(props);
		console.log('Calling ID: ', this.props._id);
		Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
	}

	printStats() {
		const visitedMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
		let lastVisited = '';

		if (typeof this.props.lastVisited === 'number') {
			lastVisited = moment(this.props.lastVisited).fromNow(); 
		}
		return `${this.props.visitedCount} ${visitedMessage} ${lastVisited}`;
	}

	render() {
		return (
			<div className="item">
				<h2>{this.props.url}</h2>
				<p className="item__message">{this.props.shortUrl}</p>
				<p className="item__message">{this.printStats()}</p>
				<a className="button button--link button--pill" href={this.props.shortUrl}>VISIT</a>
				<button className="button button--pill" id="copy" ref="copy" data-clipboard-text={this.props.shortUrl}>{this.displayValue()}</button>
				<button className="button button--pill" onClick = {() => { 
					Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
				}}>{this.props.visible ? 'Hide' : 'Unhide'}</button>
				
			</div>
		);
	}
}

LinksListItem.propTypes = {
	_id: PropTypes.string.isRequired,
	shortUrl: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	userId: PropTypes.string.isRequired
};

 