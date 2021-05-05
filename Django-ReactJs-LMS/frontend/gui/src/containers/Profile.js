import React from 'react';
import { Card } from 'antd';
import { connect } from 'react-redux';

const cardStyle = {
    width: "365px", 
    marginLeft: "auto", 
    marginRight: "auto", 
    marginTop: "150px", 
    textAlign: "center",
    backgroundColor: "#87CEEB",
    boxShadow: "0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)"
}

class Profile extends React.Component {
    render() {
        return <>
        <Card style={cardStyle} title={<h5>User Profile</h5>}>
            <table style={{fontSize: '1.15rem'}}>
                <tr style={{height: "40px"}}>
                <td style={{float: 'left'}}>User Name</td>
                <td style={{float: 'left', marginLeft: "100px"}}>{this.props.userName}</td>
                </tr>
                <tr style={{height: "40px"}}>
                <td style={{float: 'left'}}>Email</td>
                <td style={{float: 'left', marginLeft: "150px"}}>{this.props.email}</td>
                </tr>
                <tr style={{height: "40px"}}>
                <td style={{float: 'left'}}>Date of Birth</td>
                <td style={{float: 'left', marginLeft: "90px"}}>{this.props.date_of_birth}</td>
                </tr>
                <tr style={{height: "40px"}}>
                <td style={{float: 'left'}}>Staff</td>
                {this.props.staff_status === true ?
                    <td style={{float: 'left', marginLeft: "160px"}}>Yes</td>
                    :
                    <td style={{float: 'left', marginLeft: "160px"}}>No</td>
                }
                </tr>
            </table>
        </Card>
      </>
    }
}

const mapStateToProps = (state) => {
    return {
        userName: state.authReducer.userName,
        email: state.authReducer.email,
        date_of_birth: state.authReducer.date_of_birth,
        staff_status: state.authReducer.is_staff
    }
}

export default connect(mapStateToProps, null)(Profile);