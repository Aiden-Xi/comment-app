import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './content.css';

class Comment extends Component {
    constructor() {
        super();
        this.state = {
            contents: [
                {name: 'sdf', value: '人人人人'},
                {name: 'sdf', value: '哈哈哈'}
            ]
        }
    }

    handleOnClick() {
        var name_value = document.getElementById('username').value;
        var content_value = document.getElementById('content-value').value;
        
        if (name_value.length <= 0) {
            alert('请输入用户名');
            return;
        }
        if (content_value.length <= 0) {
            alert('内容不能为空');
            return;
        }
        var contents = this.state.contents;
        contents.push({name: name_value, value: content_value})
        this.setState({
            contents: contents
        })
    }

    render() {
        return(
            <div className="wrapper">
                <div className="comment-input">
                    <div className="comment-field">
                        <span className="comment-field-name">用户名:</span>
                        <div className="comment-field-input">
                            <input type="text" name="username" id="username"/>
                        </div>
                    </div>
                    <div className="comment-field">
                        <span className="comment-field-name">评论内容:</span>
                        <div className="comment-field-input">
                            <textarea name="content" id="content-value"></textarea>
                        </div>
                    </div>
                    <div className="comment-field-button">
                        <button onClick={this.handleOnClick.bind(this)}>发布</button>
                    </div>
                </div>
                {/*显示发布的评论*/}
                {this.state.contents.map((content, i) => <Content key={i} content={content}/>)}
            </div>
        )
    }
}

class Content extends Component {
    render() {
        const { content } = this.props;
        return(
            <div className="comment">
                <div className="comment-user">
                    <span>{content.name}</span>
                </div>
                <p>：{content.value}</p>
            </div>
        )
    }
}

ReactDOM.render(<Comment />, document.getElementById('root'));
