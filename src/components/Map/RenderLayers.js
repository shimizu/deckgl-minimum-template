import {GeoJsonLayer, ScatterplotLayer, GridCellLayer} from '@deck.gl/layers';
import {CSVLoader} from '@loaders.gl/csv';
import { WindowSharp } from '@mui/icons-material';

import { color as d3color } from  "d3-color"

//convert HEX -> RGB Array
d3color.prototype.toArray = function () { return [this.r, this.g, this.b] }


export function renderLayers(props) {
  const {  } = props;
  let showLayers = [];

 

  return showLayers;
}
