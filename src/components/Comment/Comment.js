import React from 'react'

	export default class Comment extends React.Component {

		render() {
			return (
				<div className="comment">
					<h3>{this.props.comment.author}</h3>
					<p>{this.props.comment.text}</p>
				</div>
			)
		}
	}