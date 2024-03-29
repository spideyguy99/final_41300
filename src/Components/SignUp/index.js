import React from "react";
import fire from "../Firebase";
import { useDispatch} from "react-redux";
import {checkChange} from "../Redux/Actions/setActions";
import {Link} from "react-router-dom";
import {Button, Form, Jumbotron} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SignUp(){

    const dispatch = useDispatch();

    const [value, setValues] = React.useState({
        email: "",
        password: "",
        name: ""
    });

    const handleChange = prop => event => {
        setValues({...value, [prop]: event.target.value});
    };

    const onSubmit = () => {
        console.log(value);
        fire.auth().createUserWithEmailAndPassword(value.email, value.password).then(() => {
            let user = fire.auth().currentUser;

            user.updateProfile({
                displayName: value.name
            }).then(function () {
                setValues({
                    email: "",
                    password: "",
                    name: ""
                })
                dispatch(checkChange());
            })
        }).catch(function (error) {
            let errorCode = error.code;
            let errorMessage = error.message;
        })

    };

    return(
        <div>
            <Jumbotron style={{margin: "0 auto", width: "50vh", minHeight: "25vh", marginTop: "10vh", padding: 20}}>
                <h1>Sign Up</h1>
                <Form>
                    <Form.Group controlId={"formBasicEmail"}>
                        <Form.Control type={"email"} placeholder={"Enter email"} onChange={handleChange("email")} value={value.email}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type={"name"} placeholder={"Enter name"} onChange={handleChange("name")} value={value.name}/>
                    </Form.Group>
                    <Form.Group controlId={"formBasicPassword"}>
                        <Form.Control type={"password"} placeholder={"Password"} onChange={handleChange("password")} value={value.password}/>
                    </Form.Group>
                    <Link to={"/home"}>
                        <Button onClick={onSubmit}>
                            Sign Up
                        </Button>
                    </Link>
                </Form>
            </Jumbotron>
        </div>
    )
}