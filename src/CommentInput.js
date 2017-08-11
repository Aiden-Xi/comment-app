import React, {Component} from 'react'

class CommentInput extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            content: ''
        }
    }
    /* 组件生命周期 */
    // 数据将要挂起的时候将用户名取出
    componentWillMount() {
        this._loadUsername()
    }
    // 组件挂起之后将内容输入框获取焦点
    componentDidMount() {
        this.textarea.focus()
    }

    /* 私有方法， 都是用 _ 开头 */
    // 取出本地保存的数据
    _loadUsername() {
        const username = localStorage.getItem('username')
        this.setState({ username })
    }

    // 本地持久化保持数据
    _saveUsername(username) {
        localStorage.setItem('username', username)
    }

    /* 事件监听方法 */
    handleUsernameChange(event) {
        this.setState({
            username: event.target.value
        })
    }
    // 输入框失去焦点事件触发
    handleUsernameBlur(event) {
        this._saveUsername(event.target.value)
    }
    handleContentChange(event) {
        this.setState({
            content: event.target.value
        })
    }
    handleSubmit() {
        console.log(`是否实现提交方法 = ${this.props.onSubmit}`);
        if (this.props.onSubmit) {
            const { username, content } = this.state
            // 函数的调用- 可以在这个函数里面讲获取的数据进行渲染到需要的子组件上
            this.props.onSubmit({username, content})
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