import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class CommentInput extends Component {
    static propTypes = {
        username: PropTypes.any,
        onSubmit: PropTypes.func,
        onUserNameInputBlue: PropTypes.func
    }

    static defaultProps = {
        username: ''
    }

    constructor(props) {
        super(props)
        this.state = {
            username: props.username, // 从props上取username 字段的数据
            content: ''
        }
    }


    // 组件挂起之后将内容输入框获取焦点
    componentDidMount() {
        this.textarea.focus()
    }

    // 输入框失去焦点事件触发
    handleUsernameBlur(event) {
        if (this.props.onUserNameInputBlue) {
            this.props.onUserNameInputBlue(event.target.value)
        }
    }

    /* 事件监听方法 */
    handleUsernameChange(event) {
        this.setState({
            username: event.target.value
        })
    }

    handleContentChange(event) {
        this.setState({
            content: event.target.value
        })
    }
    handleSubmit() {
        console.log(`是否实现提交方法 = ${this.props.onSubmit}`);
        if (this.props.onSubmit) {
            // 函数的调用- 可以在这个函数里面讲获取的数据进行渲染到需要的子组件上
            this.props.onSubmit({
                username: this.state.username,
                content: this.state.content,
                createTime: +new Date()
            })
        }
        // 将输入框内容重新清空
        this.setState({
            content: ''
        })
    }

    render() {
        return (
            <div className="comment-input">
                <div className="comment-field">
                    <span className="comment-field-name">用户名：</span>
                    <div className="comment-field-input">
                        <input
                            type="text"
                            value={this.state.username}
                            onBlur={this.handleUsernameBlur.bind(this)}
                            onChange={this.handleUsernameChange.bind(this)}/>
                    </div>
                </div>
                <div className="comment-field">
                    <span className="comment-field-name">评论内容：</span>
                    <div className="comment-field-input">
                        <textarea
                            ref={(textarea) => this.textarea = textarea}
                            value={this.state.content}
                            onChange={this.handleContentChange.bind(this)}>
                        </textarea>
                    </div>
                </div>
                <div className="comment-field-button">
                    <button onClick={this.handleSubmit.bind(this)}>发布</button>
                </div>
            </div>
        )
    }
}

export default CommentInput