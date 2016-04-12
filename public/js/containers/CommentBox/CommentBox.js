'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _components = require('../components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CommentBox = function (_React$Component) {
	_inherits(CommentBox, _React$Component);

	function CommentBox(props) {
		_classCallCheck(this, CommentBox);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CommentBox).call(this, props));

		_this.state = { comments: [] };
		_this.api = { url: _this.props.url, refresh: _this.props.pollInterval };

		_this.submitComment = _this.submitComment.bind(_this);
		_this.loadComments = _this.loadComments.bind(_this);
		return _this;
	}

	_createClass(CommentBox, [{
		key: 'loadComments',
		value: function loadComments() {
			var _this2 = this;

			$.ajax({
				url: this.api.url,
				method: 'GET',
				dataType: 'json',
				success: function success(data) {
					_this2.setState({ comments: data });
				}
			});
		}
	}, {
		key: 'submitComment',
		value: function submitComment(commentData) {
			var _this3 = this;

			$.ajax({
				url: this.api.url,
				method: 'POST',
				dataType: 'json',
				data: commentData,
				success: function success(data) {
					_this3.setState({ comments: data });
				}
			});
		}
	}, {
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.loadComments();
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			setInterval(this.loadComments, this.api.refresh);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'comment-box' },
				_react2.default.createElement(
					'h1',
					null,
					'Comments | React Tutorial (ES6)'
				),
				_react2.default.createElement(_components.CommentList, { comments: this.state.comments }),
				_react2.default.createElement(_components.CommentForm, { onSubmitComment: this.submitComment })
			);
		}
	}]);

	return CommentBox;
}(_react2.default.Component);

exports.default = CommentBox;