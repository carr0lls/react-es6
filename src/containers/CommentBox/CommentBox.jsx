import React from 'react'
import { CommentList, CommentForm } from '../../components'

	export default class CommentBox extends React.Component {
		constructor(props) {
			super(props)
			this.state = { comments: [] }
			this.api = {url: this.props.url, refresh: this.props.pollInterval}			

			this.submitComment = this.submitComment.bind(this)
			this.loadComments = this.loadComments.bind(this)
		}
		loadComments() {
			$.ajax({
				url: this.api.url,
				method: 'GET',
				dataType: 'json',
				success: (data) => {
					this.setState({comments: data})
				}
			})			
		}
		submitComment(commentData) {
			$.ajax({
				url: this.api.url,
				method: 'POST',
				dataType: 'json',
				data: commentData,
				success: (data) => {
					this.setState({comments: data})
				}
			})
		}		

		componentWillMount() {
			this.loadComments()
		}
		componentDidMount() {
			setInterval(this.loadComments, this.api.refresh)
		}

		render() {
			return (
				<div className="comment-box">
					<h1>Comments | React Tutorial (ES6)</h1>
					<CommentList comments={this.state.comments} />
					<CommentForm onSubmitComment={this.submitComment}/>
				</div>
			)
		}
	}