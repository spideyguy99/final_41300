import React from "react";

import GoogleMapReact from 'google-map-react';

import {Jumbotron, Button, ButtonGroup} from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home(){

    const [position, setPosition] = React.useState({});
    const [error, setError] = React.useState(null);
    const [color, setColor] = React.useState("red");

    const onChange = ({coords}) => {
        setPosition({
            x: coords.latitude,
            y: coords.longitude,
            z: coords.altitude,
            //tells you how accurate your data is
            accuracy: coords.accuracy
        })
    };

    const onError = (error) => {
        setError(error.message);
    };

    React.useEffect(()=>{
        const geo = navigator.geolocation;
        if(!geo){
            setError("Geolocation isn't working");
            return;
        }

        let watcher =  geo.watchPosition(onChange, onError);
        //return makes it only run once
        return () => geo.clearWatch(watcher);
    },[]);

    return(
        <div>
            <Jumbotron style={{margin: 50}}>
                <h1>Home</h1>
                <ButtonGroup aria-label="Basic example" style={{margin: 25}}>
                    <Button variant="primary">First Garage</Button>
                    <Button variant="secondary">Second Garage</Button>
                    <Button variant="primary">Third Garage</Button>
                </ButtonGroup>
                <div style={{height:"600px", width:"80vh", margin:"0 auto"}}>
                    <GoogleMapReact
                        bootstrapURLKeys={{key: "AIzaSyAlIzFjNetEI-CG6ZBkD4NNPdNw8S7Mo7k"}}
                        defaultCenter={[39.775105,-86.171726]}
                        defaultZoom={17}
                    >
                    </GoogleMapReact>
                </div>
            </Jumbotron>
        </div>
    )
}