import { GeoJsonLayer } from '@deck.gl/layers';
import { TileLayer } from '@deck.gl/geo-layers';

export function renderLayers(props) {

    const layer = new GeoJsonLayer({
        id: 'GeoJsonLayer',
        data: './data/pref.geojson',
        stroked: true,
        filled: true,
        pickable: false,
        getFillColor: [160, 160, 180, 200],
        getLineColor: [0, 0, 0, 255],
    });


    return [layer];
}