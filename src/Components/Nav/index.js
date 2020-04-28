import React from "react";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

import Nav from "react-bootstrap/Nav";
import Home from "../Home";
import SignIn from "../SignIn";
import SignUp from "../SignUp";

import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navigation(){
    return(
        <div>
            <Router>
                <Nav variant="tabs" defaultActiveKey="/home" style={{ marginBottom: 10}}>
                    <Nav.Item>
                        <Nav.Link eventKey={'link-1'}>
                            <Link to={'/'} style={{padding:25}}>
                                Home
                            </Link>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={'link-2'}>
                            <Link to={'/signin'} style={{padding:25}}>
                                Sign In
                            </Link>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={'link-3'}>
                            <Link to={'/signup'} style={{padding:25}}>
                                Sign Up
                            </Link>
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                <Switch>
                    <Route path={'/'} component={Home} exact/>
                    <Route path={'/signin'} component={SignIn}/>
                    <Route path={'/signup'} component={SignUp}/>
                </Switch>
            </Router>
        </div>
    )
}