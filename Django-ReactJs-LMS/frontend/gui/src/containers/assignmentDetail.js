import React from 'react';
import {connect} from 'react-redux';
import { getAssignment } from '../store/actions/assignment';
import {createStudentPerformance} from '../store/actions/assessmentSubmission';
import { Card, Spin } from 'antd';
import Questions from './Question';
import Choices from '../components/Choices';
import Timer from '../components/Timer';


const cardStyle = {
    width: "1000px", 
    marginLeft: "auto", 
    marginRight: "auto", 
    marginTop: "125px", 
    backgroundColor: "#87CEEB", 
    boxShadow: "0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)"
}

class AssignmentDetail extends React.Component {
    state = {
        userAnswers: {},
        sec: JSON.parse(sessionStorage.getItem('seconds')),
        mins: JSON.parse(sessionStorage.getItem('minutes'))
    };

    componentDidMount() {
        if (this.props.token !== undefined && this.props.token !== null) {
            this.props.getAssignmentDetail(this.props.token, this.props.match.params.ID);
        }
        
    }

    componentWillReceiveProps(newProps){
        if (newProps.token !== this.props.token) {
            if (newProps.token !== undefined && newProps.token !== null) {
              this.props.getAssignmentDetail(newProps.token, this.props.match.params.ID);
            }
        }
    }

    onChange = (e, questionID) => {
        const {userAnswers} = this.state;
        userAnswers[questionID] = e.target.value;
        this.setState({userAnswers});
    }

    handleSubmit = () => {
        const {userAnswers} = this.state;
        const timeMin = JSON.parse(sessionStorage.getItem('minutes'))
        const timeSec = JSON.parse(sessionStorage.getItem('seconds'))
        const assessSubDetails = {
            user : this.props.email,
            assignment: this.props.currentAssignment.id,
            time_taken: `${timeMin} minutes ${timeSec} seconds`,
            answers: userAnswers
        };
        sessionStorage.removeItem('minutes')
        sessionStorage.removeItem('seconds')
        this.props.submitAssessment(this.props.token, assessSubDetails);
        this.props.history.push('/');
    }


    render() {
        const {currentAssignment} = this.props;
        const {subject} = currentAssignment;
        const {userAnswers} = this.state;

        return (
            <div>
                {this.props.loading ? 
                    <div style={{marginTop: "300px", textAlign: "center"}}>
                        <Spin size="large" />
                    </div>
                    :
                    Object.keys(currentAssignment).length > 0 ? (
                        <Card title={<h5 style={{color: "black"}}>{subject}</h5>} 
                        extra={<h5><Timer 
                        minsData={this.state.mins} 
                        secData={this.state.sec} /></h5>}
                        style={cardStyle}
                        >
                        <Questions 
                        submit = {() => this.handleSubmit()}
                        questions={currentAssignment.questions.map(question => {
                            return (
                                <Card
                                type="inner"
                                style={{backgroundColor: "#F5F5F5"}}
                                key = {question.id}
                                title={
                                <h5 style={{color: "#000080", fontSize: "1.10rem"}}>
                                    {`${question.question_number}.    ${question.question}`}
                                </h5>
                                    }
                                >
                                 <Choices 
                                 change={this.onChange}
                                 choices={question.choices}
                                 questionID={question.question_number}
                                 userAnswers={userAnswers}
                                 />
                                </Card>
                            );
                        })}
                        />
                    </Card>
                    ) : (
                        null
                    )
                }
                
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        token: state.authReducer.token,
        email: state.authReducer.email,
        currentAssignment: state.assignmentReducer.currentAssignment,
        loading: state.assignmentReducer.loading,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAssignmentDetail: (token, assignID) => dispatch(getAssignment(token, assignID)),
        submitAssessment : (token, submitDeatils) => dispatch(createStudentPerformance(token, submitDeatils))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentDetail)