const INIT_COMMENTS = 'INIT_COMMENTS'
const ADD_COMMENTS = 'ADD_COMMENTS'
const DELETE_COMMENTS = 'DELETE_COMMENTS'

export default function (state, action) {
    if (!state) {
        state = { comments: [] }
    }

    switch(action.type) {
        case INIT_COMMENTS:
            // 初始化相关评论数据
            return { comments: action.comments }
        case ADD_COMMENTS:
            // 添加评论
            return { comments: [...state.comments, action.comment] }
        case DELETE_COMMENTS:
            // 删除评论
            return { comments: [...state.comments.slice(0, action.commentIndex), ...state.comments.slice(action.commentIndex + 1)] }
        default:
            return state
    }
}

export const initComments = (comments) => {
    return { type: INIT_COMMENTS, comments }
}

export const addComments = (comment) => {
    return { type: ADD_COMMENTS, comment }
}

export const deleteComments = (commentIndex) => {
    return { type: DELETE_COMMENTS, commentIndex }
}