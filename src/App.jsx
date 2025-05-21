import { useState } from 'react'
import DeckGL from '@deck.gl/react';


import { renderLayers } from './Layers'

import "./index.css";

// 初期ビューポートの設定
const INITIAL_VIEW_STATE = {
  latitude: 35.73202612464274,
  longitude: 137.53268402693763,
  bearing: 0,
  pitch: 0,
  zoom: 4
};

function App() {
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE)


  return (
    <div>
      <DeckGL
        initialViewState={viewState}
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

export default App
