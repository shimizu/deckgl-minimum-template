import React, {useState,  useEffect } from 'react';
import DeckGL from '@deck.gl/react';
import { StaticMap } from 'react-map-gl';

import { renderLayers } from "./RenderLayers";


// 背景マップに使用するMapboxのトークン設定
const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;

// 初期ビューポートの設定
const INITIAL_VIEW_STATE = {
    bearing: 25.165048543689323,
    latitude: 35.73202612464274,
    longitude: 137.53268402693763,
    pitch: 54.083529814863375,
    zoom: 12
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
                <StaticMap
                    mapStyle="mapbox://styles/mapbox/satellite-v9"
                    mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
                />
            </DeckGL>
        </div>
    );
}

export default Map;