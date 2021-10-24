import React, {useState,  useEffect, createContext } from 'react';
import DeckGL from '@deck.gl/react';
import {FlyToInterpolator} from '@deck.gl/core';

import { StaticMap } from 'react-map-gl';
import { json as d3json} from 'd3-fetch'


import { renderLayers } from "./RenderLayers";


import { createTheme, ThemeProvider  } from '@mui/material/styles';


//レイアウト用ボックス
import Box from '@mui/material/Box';


//エリアサマリーパネル
import SamplePanel from "./UI/SamplePanel";
import SampleBtns from './UI/SampleBtns';

//テーマスタイル
const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});


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


export const CtxLayerStatus = createContext();

function Map({ data }) {
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
            <ThemeProvider theme={theme}>
                <Box
                    sx={{
                        position: "absolute",
                        top: 10,
                        left: 10,
                        width:300
                    }}
                >
                </Box>

                <Box 
                    sx={{
                        position: "absolute",
                        top: 10,
                        right: 10
                    }}

                >
                    <SampleBtns/> 
                </Box>
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 20,
                        right: 10
                    }}

                >
                    <SamplePanel/>
                </Box>


            </ThemeProvider>
        </div>
    );
}

export default Map;