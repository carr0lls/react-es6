import React from 'react'
import ReactDOM from 'react-dom'
import CommentBox from './containers'

	ReactDOM.render(
		<CommentBox url="/api/comments" pollInterval={3000} />,
		document.getElementById('content')
	)