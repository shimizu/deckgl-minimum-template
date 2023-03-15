import { TileLayer, BitmapLayer, GeoJsonLayer } from 'deck.gl';


export function renderLayers({data}) {
 
  //都道府県GeoJSONを読み込んで表示
  const prefLayer = new GeoJsonLayer({
    id: 'geojson-layer',
    data: data,
    stroked: true,
    filled: true,
    lineWidthScale: 20,
    lineWidthMinPixels: 2,
    getFillColor: [0, 255, 0, 200],
    getLineColor: [0, 0, 0],
    getLineWidth: 1,
  });


  //OSMタイルを読み込みベースマップとして表示
  const tileLayer = new TileLayer({
    id:"tile-layer",
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

  //レイヤーの重なり順を配列で指定(先頭のレイヤーが一番下になる)
  return [tileLayer, prefLayer];
}
