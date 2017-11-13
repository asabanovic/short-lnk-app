import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Links } from './../api/links';
import LinksListItem from './LinksListItem';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

export default class LinksList extends React.Component {

	componentDidMount() {
		this.linksListTracker = Tracker.autorun(() => {
			console.log('Logging links ..');
			Meteor.subscribe('linksPub');
			const links = Links.find({
				visible: Session.get('visibility')
			}).fetch();
			console.log(links);
			this.setState({links});
		});
	}

	componentWillUnmount() {
		console.log('component will unmount');
		this.linksListTracker.stop();
	}

	constructor(props){
	    super(props);

	    this.state = {
	    	links: []
	    };
	}

	renderLinkListItems() {
		console.log('rendering lists');
		if (this.state.links.length <= 0) {
			return <div className="item"><p className="item__status-message">No links added</p></div>;
		} else {
			return this.state.links.map(function(link) {
				const shortUrl = Meteor.absoluteUrl(link._id);
				return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />;
			});	
		}
	}

	render() {
		return (
			<div>
				<FlipMove duration={350} easing="ease-out" maintainContainerHeight={true}>
					{this.renderLinkListItems()}
				</FlipMove>
			</div>
		);
	};
};