import React from 'react';
import { List, Card, Button, Spin } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/assignment";

const cardStyle = {
    width: "250px", 
    textAlign: "center", 
    backgroundColor: "#F0FFFF", 
    boxShadow: "0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)"
}

class AssignmentList extends React.PureComponent {

    componentDidMount() {
        console.log("Component mounted");
        if(this.props.token !== null && this.props.token !== undefined) {
            this.props.getAssignmentList(this.props.token);
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            this.props.getAssignmentList(newProps.token);
          }
        }
      }

    renderItem(item) {
        return (
            <>
            <Card title={item.subject} bordered={false} 
                style={cardStyle}>
                <table>
                    <tr style={{height: "40px"}}>
                        <td style={{float: 'left'}}><h6>Topic</h6></td>
                        <td style={{float: 'left', marginLeft: "100px"}}>{item.topic}</td>
                    </tr>
                    <tr style={{height: "40px"}}>
                        <td style={{float: 'left', color: "#191970"}}><h6>No. of questions</h6></td>
                        <td style={{float: 'left', marginLeft: "30px"}}>{item.number_of_questions}</td>
                    </tr>
                    <tr style={{height: "40px"}}>
                        <td style={{float: 'left', color: "#191970"}}><h6>Duration</h6></td>
                        <td style={{float: 'left', marginLeft: "65px"}}>{item.duration}</td>
                    </tr>
                </table>
                <Link to={`assignments/${item.id}/`} ><Button type="primary" >Take Assesment</Button></Link>
                </Card>
                </>
        )
    }

    render() {
        sessionStorage.setItem('seconds', 0)
        sessionStorage.setItem('minutes', 0)
        return (
            <>
            <div style={{marginLeft: "50px", marginTop: "100px"}}>
                {/* <h3 style={{ margin: "16px 0" }}>Assignment List</h3> */}
                {this.props.loading === true ?
                    <div style={{marginTop: "300px", textAlign: "center"}}>
                        <Spin size="large" />
                    </div>
                    :
                    this.props.token !==null && this.props.token !== undefined ?
                        <List
                        size="large"
                        style={{marginLeft: "150px"}}
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
                        dataSource={this.props.assignments}
                        renderItem={item => this.renderItem(item)}
                        />
                        :
                    <div style={{textAlign: "center"}}>
                        <h6>Please <Link to="/login">Login</Link> to get the assessments. If you dont have
                        an account <Link to="/register">Register here</Link>
                        </h6>
                    </div>
                }
            </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.authReducer.token,
        assignments: state.assignmentReducer.assignments,
        loading : state.assignmentReducer.loading,
        error: state.assignmentReducer.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAssignmentList : (token) => dispatch(actions.getAssignmentsList(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentList);