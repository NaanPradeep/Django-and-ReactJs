import React from 'react';
import { Button, Card } from 'antd';
import { Link } from 'react-router-dom';

const cardStyle = {
    width: "1000px", 
    marginLeft: "auto", 
    marginRight: "auto", 
    marginTop: "80px", 
    backgroundColor: "#87CEEB", 
    boxShadow: "0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)"
}

class HomePage extends React.Component {
    render() {
        return <>
            <div style={{textAlign: "center", marginTop: "100px"}}>
                <Card style={cardStyle} title={<h5>Why Is Assessment Important?</h5>}>
                   <h6> Asking students to demonstrate their understanding of the 
                    subject matter is critical to the learning process; it is essential 
                    to evaluate whether the educational goals and standards of the lessons 
                    are being met.
                    </h6>
                </Card>
                <Card style={cardStyle} title={<h5>How Classroom Assessments Improve Learning</h5>}>
                   <h6> Teachers who develop useful assessments, provide corrective instruction, 
                       and give students second chances to demonstrate success can improve their 
                       instruction and help students learn.
                    </h6>
                    <i style= {{float: 'right'}}><h6>Thomas R. Guskey</h6></i>
                </Card>
                <Link to="/assignments">
                    <Button style={{marginTop: "50px", width: "500px", height: "50px"}} type="primary">
                        Get Assessments
                    </Button>
                </Link>
            </div>
        </>
    }
}

export default HomePage;