import React from 'react';
import {getStudentPerformance} from '../store/actions/assessmentSubmission';
import { getAssignment } from '../store/actions/assignment';
import { connect } from 'react-redux';
import { List, Card, Button, Spin } from "antd";
import { Link } from "react-router-dom";

const cardStyle = {
    textAlign: "center", 
    width: "300px", 
    backgroundColor: "#F0FFFF", 
    boxShadow: "0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)"
}

class Performance extends React.PureComponent {

    componentDidMount() {
        if(this.props.token !== null && this.props.token !== undefined) {
            this.props.getPerformance(this.props.email, this.props.token);
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            this.props.getPerformance(newProps.email, newProps.token);
          }
        }
      }

    renderItem(item) {
        return (
            <List.Item>
                <Card title={item.assessment_subject} bordered={false} 
                style={cardStyle}>
                <table>
                    <tr style={{height: "40px"}}>
                        <td style={{float: 'left'}}><h6>Topic</h6></td>
                        <td style={{float: 'left', marginLeft: "80px"}}>{item.assessment_topic}</td>
                    </tr>
                    <tr style={{height: "40px"}}>
                        <td style={{float: 'left', color: "#191970"}}><h6>Score</h6></td>
                        <td style={{float: 'left', marginLeft: "79px"}}>{item.score}</td>
                    </tr>
                    <tr style={{height: "40px"}}>
                        <td style={{float: 'left', color: "#191970"}}><h6>Time</h6></td>
                        <td style={{float: 'left', marginLeft: "70px"}}>{item.time_taken}</td>
                    </tr>
                </table>
                </Card>
            </List.Item>
        )
    }

    render() {
        return (
            <React.Fragment>
                <div style={{marginLeft: "50px", marginTop: "100px"}}>
                    {/* <h3 style={{ margin: "16px 0" }}>Assignment List</h3> */}
                    {this.props.loading === true ?
                        <div style={{marginTop: "300px", textAlign: "center"}}>
                            <Spin size="large" />
                        </div>
                        :
                        this.props.token !==null && 
                        this.props.token !== undefined &&  
                        this.props.loading === false?
                            <List
                            size="large"
                            style={{marginLeft: "200px"}}
                            grid={{
                                gutter: 16,
                                xs: 1,
                                sm: 2,
                                md: 2,
                                lg: 3,
                                xl: 4,
                                xxl: 3,
                              }}
                            style={{ marginTop: "50px" }}
                            dataSource={this.props.assessmentPerformance}
                            renderItem={item => this.renderItem(item)}
                            />
                            :
                        <div style={{textAlign: "center"}}>
                            <h6>Please <Link to="/login">Login</Link> to get your Performance Portal. If you dont have
                            an account <Link to="/register">Register here</Link>
                            </h6>
                        </div>
                    }
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        assessmentID: state.performanceReducer.assessmentPerformance.assignment,
        token: state.authReducer.token,
        email: state.authReducer.email,
        assessmentPerformance: state.performanceReducer.assessmentPerformance,
        loading: state.performanceReducer.loading,
        error: state.performanceReducer.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPerformance: (email, token) => dispatch(getStudentPerformance(email, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Performance);