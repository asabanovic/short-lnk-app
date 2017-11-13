import React from 'react';
import { Session } from 'meteor/session';

export default class LinksListFilters extends React.Component {

	toggleVisibility() {
		const visibility = Session.get('visibility');
		Session.set('visibility', !visibility);
	}

	render() {
		return (
			<div>
				<label className="checkbox">
					<input className="checkbox__box" type="checkbox" ref="visibility" onClick={this.toggleVisibility.bind(this)} /> {Session.get('visibility') ? 'Show hidden' : 'Show visible links'}
				</label>
			</div>
		);
	}
}