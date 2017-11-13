import React from 'react';
import {BrowserHistory} from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters';

// export default class Link extends React.Component {

// 	render() {
// 		return (
// 				<div>
// 					<PrivateHeader title="Your Links" />
// 					<LinksList/>
// 					<AddLink/>
// 				</div>
// 			);
// 	};
// }

export default () => {
	return (
		<div>
			<PrivateHeader title="Short Lnk" />
			<div className="container">
				<LinksListFilters/>
				<AddLink/>
				<LinksList/>
			</div>
		</div>
	);
}