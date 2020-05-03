import React from "react";
import GoogleMapReact from 'google-map-react';
import {Jumbotron, Button, ButtonGroup, Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {checkSignIn, initCart, currentUser} from "../Redux/Actions/setActions";
import fire from "../Firebase";
import {useSelector, useDispatch} from "react-redux";
import Lot80Marker from "../Marker/Lot80Marker";
import Lot86Marker from "../Marker/Lot86Marker";
import Lot71Marker from "../Marker/Lot71Marker";
import Lot83Marker from "../Marker/Lot83Marker";

export default function Home(){

    const [position, setPosition] = React.useState({});
    const [error, setError] = React.useState(null);
    const db = fire.firestore();
    const dispatch = useDispatch();
    const change = useSelector(state=>state.change);
    const signedIn = useSelector(state=>state.signedIn);
    const user = useSelector(state=>state.user);
    const realUser = useSelector(state=>state.realUser);
    const lot80 = [39.772608, -86.176337];
    const lot86 = [39.770871, -86.172777];
    const lot71 = [39.775189, -86.171638];
    const lot83 = [39.773548, -86.169278];
    const [location, setLocation] = React.useState(lot80);
    const lot71Color = "red";

    React.useEffect(() => {
        let newItems = [];

        db.collection("bucket").get().then(function (snapshot) {
            snapshot.forEach(function (doc) {
                const object = doc.data();

                let item = {
                    name: object.name,
                };

                newItems.push(item);
            });
            dispatch(initCart((newItems)));
        });

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

    const lot71Click = () => {
        setLocation(lot71);
        console.log("Lot 71");
    }

    const lot83Click = () => {
        setLocation(lot83);
        console.log("Lot 86");
    }

    const lot86Click = () => {
        setLocation(lot86);
        console.log("Lot 86");
    }

    const lot71FinderX = () => {
        if(position.x <= 39.774666 && position.x >= 39.775778){
            return(true)
        }else{
            return(false)
        }
    }

    const lot71FinderY = () => {
        if(position.y <= -86.172233 && position.y >= -86.171035){
            return(true)
        }else{
            return(false)
        }
    }

    const lot71Locator = () => {
        if(lot71FinderY() && lot71FinderX()){
            return("Yes")
        }else{
            return("No")
        }
    }

    const lot86FinderX = () => {
        if(position.x <= 39.770553 && position.x >= 39.771309){
            return(true)
        }else{
            return(false)
        }
    }

    const lot86FinderY = () => {
        if(position.y <= -86.173277 && position.y >= -86.171558){
            return(true)
        }else{
            return(false)
        }
    }

    const lot86Locator = () => {
        if(lot86FinderY() && lot86FinderX()){
            return("Yes")
        }else{
            return("No")
        }
    }

    const lot83FinderX = () => {
        if(position.x <= 39.774251 && position.x >= 39.772998){
            return(true)
        }else{
            return(false)
        }
    }

    const lot83FinderY = () => {
        if(position.y <= -86.169958 && position.y >= -86.168624){
            return(true)
        }else{
            return(false)
        }
    }

    const lot83Locator = () => {
        if(lot83FinderY() && lot83FinderX()){
            return("Yes")
        }else{
            return("No")
        }
    }

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
            <Jumbotron style={{margin: 50, minHeight: "50vh", marginTop: "10vh", padding: 20}}>
                <div style={{display: "flex"}}>
                    <h1 style={{width:"60%"}}>Home</h1>
                    <Table striped bordered hover style={{width:"40%"}}>
                        <thead>
                        <tr>
                            <th>Current Username</th>
                            <th>{signedIn ? realUser.name: "No User Found"}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>X-Coordinates</td>
                            <td>{position.x}</td>
                        </tr>
                        <tr>
                            <td>Y-Coordinates</td>
                            <td>{position.y}</td>
                        </tr>
                        <tr>
                            <td>Are you in lot 86?</td>
                            <td>{lot86Locator()}</td>
                        </tr>
                        <tr>
                            <td>Are you in lot 71?</td>
                            <td>{lot71Locator()}</td>
                        </tr>
                        <tr>
                            <td>Are you in lot 83?</td>
                            <td>{lot83Locator()}</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
                <div style={{
                    backgroundColor:"aliceblue",
                    width: "80%",
                    height: "80%",
                    border: "3 solid black",
                    borderRadius: 4,
                    margin: "0 auto"
                }}>
                    <ButtonGroup aria-label="Basic example" style={{margin: 25}}>
                        <Button variant="primary" onClick={lot86Click}>Herron Parking Lot</Button>
                        <Button variant="secondary" onClick={lot71Click}>ET Garage</Button>
                        <Button variant="primary" onClick={lot83Click}>IT Parking Lot</Button>
                    </ButtonGroup>
                    <div style={{
                        height:"600px",
                        width:"80vh",
                        margin:"0 auto",
                        border:"5px solid grey",
                        borderRadius: 5}}>
                        <GoogleMapReact
                            bootstrapURLKeys={{key: "AIzaSyAlIzFjNetEI-CG6ZBkD4NNPdNw8S7Mo7k"}}
                            center={location}
                            defaultZoom={17}
                        >
                            <Lot80Marker lat={39.773085} lng={-86.177108}/>
                            <Lot86Marker lat={39.771286} lng={-86.173326}/>
                            <Lot71Marker lat={39.775450} lng={-86.172017}/>
                            <Lot83Marker lat={39.773842} lng={-86.169721}/>
                        </GoogleMapReact>
                </div>

                </div>
            </Jumbotron>
        </div>
    )
}