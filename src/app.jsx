import React from 'react'
import ReactDOM from 'react-dom'
import { CommentBox } from './containers'

	var props = window.APP_PROPS;

	ReactDOM.render(<CommentBox url={props.url} data={props.data} pollInterval={props.pollInterval} />, content)
