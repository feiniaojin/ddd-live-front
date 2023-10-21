import React, { Component } from "react";

class ErrorBoundary extends Component{
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }
    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
    }
    render(){
        const {children,} = this.props;
        const {errorInfo} = this.state;
        if (errorInfo) {
            return (
                <div>
                    <h2>执行异常</h2>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                    </details>
                </div>
            );
        }
        return children;
    }
}
export default ErrorBoundary