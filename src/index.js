/// app.js
import React from 'react';
import ReactDOM from "react-dom";

import Map from "./Map.js";

import "./styles.css";

function App() {
    return (
        <Map ></Map>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));