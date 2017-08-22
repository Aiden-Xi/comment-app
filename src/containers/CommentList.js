import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CommentList from '../components/CommentList'
import { connect } from 'react-redux'
import { initComments, deleteComments } from '../reducers/Comments'

// 一个Smart组件， 负责评论雷彪数据的加载、初始化 删除评论
class CommentListContainer extends Component {
    static propTypes = {
        comments: PropTypes.array,
        initComments: PropTypes.func,
        onDeleteComment: PropTypes.func
    }

    componentWillMount() {
        // 生命周期中初始化数据
        this._loadComments()
    }

    _loadComments() {
        // 从LocalStorage中加载数据
        let comments = localStorage.getItem('comments')
        comments = comments ? JSON.parse(comments) : []
        // this.props.initComments 是 connect 传进来的
        // 可以帮我们把数据初始化到 state 里面去
        this.props.initComments(comments)
    }

    handleDeleteComment(index) {
        const { comments } = this.props
        // props 是不能改变的。 所以这里新建一个删除了特定下表评论的列表
        const newComments = [...comments.slice(0, index), ...comments.slice(index + 1)]

        // 保存新的评论列表到localStorage里面
        localStorage.setItem('comments', JSON.stringify(newComments))
        if (this.props.onDeleteComment) {
            this.props.onDeleteComment(index)
        }
    }

    render() {
        return(
            <CommentList
                comments={this.props.comments}
                onDeleteComment={this.handleDeleteComment.bind(this)}
            />
        )
    }
}

// 评论列表从 state.comments 中获取
const mapStateToProps = (state) => {
    return { comments: state.comments }
}

//
const mapDispatchToProps = (dispatch) => {
    return {
        // 提供给CommentListContainer
        // 当从LocalStorage加载评论列表以后就会通过这个方法
        // 把评论列表初始化到state里面
        initComments: (comments) => {
            dispatch(initComments(comments))
        },

        // 删除评论
        onDeleteComment: (commentIndex) => {
            dispatch(deleteComments(commentIndex))
        }
    }
}

// 将CommentListContainer connect 到 store
export default connect(mapStateToProps, mapDispatchToProps)(CommentListContainer)