import React from "react";
import {Link} from "react-router-dom";
import fire from "../Firebase";

//bootstrap imports
import {Jumbotron, Form, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login(){

    const [value, setValues] = React.useState({
        email: "",
        password: "",
    });

    const handleChange = prop => event => {
        setValues({...value, [prop]: event.target.value});
    };

    const onSubmit = () => {
        console.log(value);
        fire.auth().signInWithEmailAndPassword(value.email, value.password).then(()=>{
            setValues({
                email: "",
                password: ""
            })
        }).catch(function (error) {
            let errorCode = error.code;
            let errorMessage = error.message;
        })
    };

    return(
        <div>
            <Jumbotron style={{margin: "0 auto", width: "50vh", minHeight: "25vh", marginTop: "10vh", padding: 20}}>
                <h1>Login</h1>
                <Form>
                    <Form.Group controlId={"formBasicEmail"}>
                        <Form.Control type={"email"} placeholder={"Enter email"} onChange={handleChange("email")} value={value.email}/>
                    </Form.Group>
                    <Form.Group controlId={"formBasicPassword"}>
                        <Form.Control type={"password"} placeholder={"Password"} onChange={handleChange("password")} value={value.password}/>
                    </Form.Group>
                    <Link to={"/home"}>
                        <Button onClick={onSubmit}>
                            Login
                        </Button>
                    </Link>
                </Form>
            </Jumbotron>
        </div>
    )
}