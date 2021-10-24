/// app.js
import React from 'react';
import ReactDOM from "react-dom";

import Map from "./components/Map";

import "./App.css";



function App() {

    return (
        <Map ></Map>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));