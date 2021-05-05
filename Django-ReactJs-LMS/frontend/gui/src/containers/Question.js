import React from 'react';
import { Button } from 'antd';


class Questions extends React.Component {
    state = {
        current: 0
    }

    next = () => {
        const current = this.state.current + 1;
        this.setState({current})
    }

    previous = () => {
        const current = this.state.current - 1;
        this.setState({current})
    }

    render() {
        const {current} = this.state;
        const {questions} = this.props;
        return (
            <div>
                <div>{questions[current]}</div>
                <div style={{float: "right", marginTop: "20px"}}>
                    {current < questions.length - 1 && (
                        <Button type="primary" onClick={() => this.next()}>
                        Next
                        </Button>
                    )}
                    {current === questions.length - 1 && (
                        <Button type="primary" onClick={() => this.props.submit()}>
                        Submit
                        </Button>
                    )}
                    {current > 0 && (
                        <Button type="primary" style={{ marginLeft: 8 }} onClick={() => this.previous()}>
                        Previous
                        </Button>
                    )}
                </div>
            </div>
        )
    }
};

export default Questions;