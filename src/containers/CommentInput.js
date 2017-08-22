import React, { Component } from 'react'
import { connect } from 'react-redux'
import CommentInput from '../components/CommentInput'
import { addComment } from  '../reducers/Comments'

// CommentInputContainer
// 辅助用户名的加载、 保存、 评论发布
class CommentInputContainer extends Component {
    static propTypes = {
        comments: PropTypes.array,
        onSubmit: PropTypes.func
    }

    constructor() {
        super()
        this.state = { username: '' }
    }

    componentWillMount() {
        // componentWillMount 生命周期中初始化用户名
        this._loadUsername()
    }

    _loadUsername() {
        const username = localStorage.getItem('username')
        if (username) {
            this.setState({ username })
        }
    }

    // 保存用户名
    _saveUsername(username) {
        localStorage.setItem('username', username)
    }

    handleSubmitComment(comment) {
        // 评论数据验证
        if (!comment) return
        if (!comment.username) return alert('请输入用户名')
        if (!comment.content) return alert('请输入评论内容')

        // 新增评论， 保存到content
        const { comments } = this.props
        const newComments = [...comments, comment]

        localStorage.setItem('comments', JSON.stringify(newComments))
        // 会dispatch 一个action去增加新的而评论
        if (this.props.onSubmit) {
            this.props.onSubmit(comment)
        }
    }

    render() {
        return (
            <CommentInput
                username={this.props.username}
                onUserNameInputBlue={this._saveUsername.bind(this)}
                onSubmit={this.handleSubmitComment.bind(this)}
            />

        )
    }
}

const mapStateToProps = (state) => {
    return {
        comments: state.comments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (comment) => {
            dispatch(addComment(comment))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentInputContainer)