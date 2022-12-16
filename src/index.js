/// app.js
import React from 'react';
import { createRoot } from 'react-dom/client';

import Map from "./Map.js";

import "./styles.css";

function App() {
    return (
        <Map ></Map>
    );
}



const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);


