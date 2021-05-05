import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../store/actions/auth';
// import '../App.css'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';


const CustomLayout = (props) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
    <>
        <div>
            <Navbar style={{backgroundColor: "#191970", color: "white"}} expand="md">
                <NavbarBrand style={{color: "white"}} href="/">Student Assement</NavbarBrand>
                <NavbarToggler style={{backgroundColor: "white", color: "black"}} onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                { props.isAuthenticated ? (
                    <Nav className="mr-auto" navbar>
                        <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle style={{color: "white"}} nav caret>
                            Profile
                        </DropdownToggle>
                        <DropdownMenu left>
                            <DropdownItem>
                           <Link style={{textDecoration: "none"}} to="/profile">Personal Info</Link> 
                            </DropdownItem>
                            <DropdownItem>
                           <Link style={{textDecoration: "none"}} to="/assessment-performance">Performance</Link>
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>
                                <NavLink style={{color: "red"}} onClick={props.logout}>Logout</NavLink>
                            </DropdownItem>
                        </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                )
                    : (
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                        <NavLink style={{color: "white"}} href="/login">Login</NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink style={{color: "white"}} href="/register">Signup</NavLink>
                        </NavItem>
                    </Nav>
                    )
                } 
                <Nav className="mr-auto" style={{color: "white"}} navbar>
                    <NavItem>
                    <NavLink style={{color: "white"}} href="/assignments">Get Assesments</NavLink>
                    </NavItem>
                </Nav>
                </Nav>
                {props.is_staff === true ? 
                    <NavbarText>Staff</NavbarText>
                : props.is_staff === false ?
                <NavbarText>Student</NavbarText>
                : 
                <NavbarText></NavbarText>
                }
                </Collapse>
            </Navbar>
            <div className="mr-auto">{props.children}</div>
        </div>  

    </>
    );
}

const mapStateToProps = (state) => {
   return {
    token: state.authReducer.token,
    userName: state.authReducer.userName,
    userID: state.authReducer.userID,
    is_staff: state.authReducer.is_staff
   }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(actions.logout())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CustomLayout);
