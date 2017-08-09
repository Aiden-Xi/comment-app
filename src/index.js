import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './content.css';

class Content extends Component {
    render() {
        return(
            <div className="wrapper">
                <h1>你好</h1>
            </div>
        )
    }
}

ReactDOM.render(<Content />, document.getElementById('root'));
