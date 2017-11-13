import React from 'react';
import { Link } from 'react-router-dom'

// export default class NotFound extends React.Component {
// 	render() {
// 		return <p>Page Not Found!</p>
// 	};
// }

export default () => {
	return (
		<div className="boxed-view">
				<div className="boxed-view__box">
					<h1>Page Not Found</h1>
					<p>Hmmmm, we are unable to find that page.</p>
					<Link to={'/'}>HEAD HOME</Link>
				</div>
 			</div>
	);	
}