import React from "react";

//bootstrap imports
import {Jumbotron, Form, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SignIn(){
    return(
        <div>
            <Jumbotron style={{margin: "0 auto", width: "50vh", height: "25vh", marginTop: "10vh", padding: 20}}>
                <h1>Sign In</h1>
                <Form>
                    <Form.Group controlId={"formBasicEmail"}>
                        <Form.Control type={"email"} placeholder={"Enter email"}/>
                    </Form.Group>
                    <Form.Group controlId={"formBasicPassword"}>
                        <Form.Control type={"password"} placeholder={"Password"}/>
                    </Form.Group>
                    <Button>
                        Submit
                    </Button>
                </Form>
            </Jumbotron>
        </div>
    )
}