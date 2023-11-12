import { useState, useEffect } from 'react';
import { MapView } from '@deck.gl/core/typed';
import DeckGL from '@deck.gl/react/typed'


import { renderLayers } from './Layers';

import './App.css'


const INITIAL_VIEW_STATE = {
  latitude: 35.73202612464274,
  longitude: 137.53268402693763,
  bearing: 0,
  pitch: 0,
  zoom: 4
};



function App() {
  const [data, setData] = useState(undefined);
  const [viwState] = useState(INITIAL_VIEW_STATE);


  //GeoJSONデータの読み込み
  useEffect(() => {
    const loadGeoJSON = async () => {
      const res = await fetch("./data/pref.geojson")
      const json = await res.json();
      setData(json)
    }

    loadGeoJSON();
  }, [])


  return (
    <>
      <DeckGL
        views={new MapView({ repeat :true})}
        initialViewState={viwState}
        controller={true}
        layers={renderLayers({ data })}
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
    </>
  )
}

export default App
