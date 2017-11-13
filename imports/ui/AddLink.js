import React from 'react';
import {Meteor} from 'meteor/meteor';
import Modal from 'react-modal';

export default class AddLink extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			url: '',
			isOpen: false,
			error: ''
		}
	}

	onSubmit(e) {
		e.preventDefault();

		let userId = Meteor.userId();

		Meteor.call('links.insert', this.state.url, (err, res) => {
			if (!err) {
				this.closeModal();
			} else {
				this.setState({error: err.reason});
			}
		});
	}

	closeModal(){
		this.setState({
			isOpen: false,
			url: '',
			error: ''
		});
	}

	onChange(e) {
		this.setState({
			url: e.target.value
		})
	}

	render(){
		return (
			<div>
				<button className="button" onClick={() => this.setState({isOpen: true})}>+ Add Link</button>
				<Modal
		          isOpen = {this.state.isOpen}
		          contentLabel = "Add Link"
		          onAfterOpen = {() => {this.refs.link.focus()}}
		          onRequestClose = {this.closeModal.bind(this)}
		          className="boxed-view__box"
		          overlayClassName="boxed-view boxed-view--modal"	
		        >
		            <h1>Add Link</h1>
		            <p>{this.state.error}</p>
		          	<form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
						<input type="text" ref="link" placeholder="Type your link" value={this.state.url} onChange={this.onChange.bind(this)}/>
						<button className="button" type="submit">SUBMIT</button>
						<button type="button" className="button button--secondary" onClick={this.closeModal.bind(this)}>Cancel</button>
					</form>
		        </Modal>
			</div>
		)
	}
}