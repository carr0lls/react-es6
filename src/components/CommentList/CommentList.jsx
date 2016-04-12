import React from 'react'
import { Comment } from '..'

	export default class CommentList extends React.Component {

		render() {
			var commentNodes = this.props.comments.map(function(comment, index) {
									return <Comment key={index} comment={comment} />
								})
			return (
				<div className="comment-list">
					{commentNodes}
				</div>
			)
		}
	}