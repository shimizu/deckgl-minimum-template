import React, {useState,  useEffect } from 'react';
import DeckGL from 'deck.gl';

import { renderLayers } from "./RenderLayers";

// 初期ビューポートの設定
const INITIAL_VIEW_STATE = {
    latitude: 35.73202612464274,
    longitude: 137.53268402693763,
    bearing: 0,
    pitch: 0,
    zoom: 4
};


function Map() {
    const [viwState, setViewState] = useState(INITIAL_VIEW_STATE)


    return (
        <div>
            <DeckGL
                initialViewState={viwState}
                controller={true}
                layers={renderLayers({})}
            >
            </DeckGL>
            <div className="attribution">
                <a
                    href="http://www.openstreetmap.org/about/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    © OpenStreetMap
                </a>
            </div>
        </div>
    );
}

export default Map;