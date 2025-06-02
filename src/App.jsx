import { useState } from 'react'
import DeckGL from '@deck.gl/react';
import {APIProvider, Map, limitTiltRange} from '@vis.gl/react-google-maps';

import { renderLayers } from './Layers'

import "./index.css";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

console.log(import.meta.env.VITE_GOOGLE_MAPS_API_KEY) 

// 初期ビューポートの設定
const INITIAL_VIEW_STATE = {
  latitude: 35.73202612464274,
  longitude: 137.53268402693763,
  bearing: 0,
  pitch: 0,
  zoom: 4
};

function App() {

  return (
    <div>
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        layers={renderLayers()}
        controller={true}
        onViewStateChange={limitTiltRange}>
        <Map  
          disableDefaultUI={false}
        />
      </DeckGL>
    </APIProvider>
    </div>
  );
}

export default App
