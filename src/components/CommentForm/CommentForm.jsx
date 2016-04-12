import React from 'react'

	export default class CommentForm extends React.Component {
		constructor() {
			super()
			this.handleSubmit = this.handleSubmit.bind(this)
		}
		handleSubmit(e) {
			e.preventDefault()
			var author = this.refs.input_author.value.trim()
			var text = this.refs.input_text.value.trim()

			if (!author || !text)
				return;

			this.props.onSubmitComment({author: author, text: text})
			this.refs.input_author.value = ''
			this.refs.input_text.value = ''
		}

		render() {
			return (
				<div className="comment-form" onSubmit={this.handleSubmit}>
					<form>
						<textarea ref="input_text" placeholder="Body message"></textarea>
						<input type="text" ref="input_author" placeholder="Name" />
					</form>
					<button onClick={this.handleSubmit}>Post</button>
				</div>
			)
		}
	}