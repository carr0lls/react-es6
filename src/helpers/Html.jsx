import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { CommentBox } from '../containers'

  export default class Html extends React.Component {
    render() {
      const stringData = 'var APP_PROPS = ' + JSON.stringify(this.props.containerData) + ';';

      return (
        <html>
          <head>
            <meta charset="utf-8" />
            <title>React Tutorial</title>
            <link rel="stylesheet" href="css/app.css" />
          </head>
          <body>
            <h1>COMMENTS (server and client-side rendering)</h1>
            <div id="content">
              <CommentBox containerData={this.props.containerData} />
            </div>
            <script dangerouslySetInnerHTML={{__html: stringData}}></script>
            <script type="text/javascript" src="scripts/bundle.js"></script>
          </body>
        </html>
      )
    }
  }
