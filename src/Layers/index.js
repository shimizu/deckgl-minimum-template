import { BitmapLayer } from '@deck.gl/layers';
import { TileLayer } from '@deck.gl/geo-layers';

export function renderLayers(props) {

    //OSMタイルを読み込みベースマップとして表示
    const tileLayer = new TileLayer({
        data: "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",

        minZoom: 0,
        maxZoom: 19,
        tileSize: 256,

        renderSubLayers: (props) => {
            const {
                bbox: { west, south, east, north }
            } = props.tile;

            return new BitmapLayer(props, {
                data: null,
                image: props.data,
                bounds: [west, south, east, north]
            });
        }
    });

    return [tileLayer];
}