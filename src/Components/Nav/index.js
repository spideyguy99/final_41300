import React from "react";
import {BrowserRouter as Router, Link, Route, Switch, Redirect} from "react-router-dom";
import {checkSignIn, currentUser} from "../Redux/Actions/setActions";
import {useSelector, useDispatch} from "react-redux";
import fire from "../Firebase";
import Home from "../Home";
import Login from "../Login";
import SignUp from "../SignUp";
import {Button, Nav, Navbar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navigation(){

    const signedIn = useSelector(state=>state.signedIn);
    const db = fire.firestore();
    const dispatch = useDispatch();
    const change = useSelector(state=>state.change);

    const SignOut = () => {
        fire.auth().signOut().then(function() {

        }).catch(function(error){

        });
    };

    React.useEffect(() => {
        let newItems = [];


        fire.auth().onAuthStateChanged(function(user) {
            if (user) {
                dispatch(checkSignIn(true));
                dispatch(currentUser(user));
            } else {
                dispatch(checkSignIn(false));
                dispatch(currentUser({name:""}));
            }
        });
    }, [db, dispatch, change]);

    return(
        <div>
            <Router>
                <Navbar bg={"dark"} variant={"dark"} fixed={"top"}>
                    <Navbar.Brand>41300 Final</Navbar.Brand>
                    <Nav defaultActiveKey="/home" className="mr-auto">
                        {!signedIn?
                            (
                                <span style={{display:"flex"}}>
                                    <Nav.Item>
                                    <Nav.Link eventKey={'link-2'}>
                                        <Link to={'/login'} style={{padding:25, textDecoration: "none", color: "grey"}}>
                                            Login
                                        </Link>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey={'link-3'}>
                                        <Link to={'/'} style={{padding:25, textDecoration: "none", color: "grey"}}>
                                            Sign Up
                                        </Link>
                                    </Nav.Link>
                                </Nav.Item>
                            </span>
                        ):(
                            <span style={{display:"flex"}}>
                                <Nav.Item>
                                    <Nav.Link eventKey={'link-1'}>
                                        <Link to={'/home'} style={{padding:25, textDecoration: "none", color: "grey"}}>
                                            Home
                                        </Link>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Link to={"/login"}>
                                        <Button variant="outline-info" onClick={SignOut}>Sign Out</Button>
                                    </Link>
                                </Nav.Item>
                            </span>
                        )}
                    </Nav>
                </Navbar>
                <Switch>
                    <Route path={'/'} component={SignUp} exact/>
                    <Route path={'/login'} component={Login}/>
                    <Route path={'/home'} component={Home}/>
                    <Route path={"/home"}>
                        {signedIn ? <Home/>:<Redirect to={"/login"}/>}
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}