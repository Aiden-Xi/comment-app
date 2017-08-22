import React, {Component} from 'react'

export default (WrappedComponent, name) => {
    class LocalStorageActions extends Component {
        constructor() {
            super()
            this.state= { data: null }
        }

        componentWillMount() {
            let data = localStorage.getItem(name)
            try {
                // 尝试把它解析成 JSON 对象
                this.setState({ data: JSON.parse(data) })
            } catch(e) {
                // 字符串存储
                this.setState({ data: `${data}` })
            }
        }

        saveData(data) {
            try {
                localStorage.setItem(name, JSON.stringify(data))
            } catch (e) {
                localStorage.setItem(name, `${data}`)
            }
        }

        render() {
            return(
                <WrappedComponent
                    data={this.state.data}
                    saveData={this.saveData.bind(this)}
                    // 这里的意思是把其他的参数原封不动地传递给被包装的组件
                    {...this.props} />
            )
        }
    }
    return LocalStorageActions
}