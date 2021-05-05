import React from 'react';
import {Radio} from 'antd';

const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
    fontSize: "1rem"
  };

class Choices extends React.Component {
    render() {
        const {questionID} = this.props;
        const {userAnswers} = this.props;

        return (
            <Radio.Group
            onChange={(e, qId) => this.props.change(e, questionID)}
            value={
                userAnswers[questionID] !== undefined &&
                userAnswers[questionID] !== null
                  ? userAnswers[questionID]
                  : null
              }
            >
            {this.props.choices.map((choice, index) => {
                return (
                    <Radio style={radioStyle} value={choice} key={index}>
                    {choice}
                    </Radio>
                )
            })}
            </Radio.Group>
        )
    }
}

export default Choices