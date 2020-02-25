import React, { useEffect, useRef } from "react";
import { Map, TileLayer } from "react-leaflet";
import useDimensions from "react-use-dimensions";


export default function MapCustom() {
  var defaultCenter = [25.505, -0.09];
  var [defaultZoom, setDefaultZoom] = React.useState([2.7]);

  const mapEl = useRef(null);

  let [center, setCenter] = React.useState(defaultCenter);
  var [zoom, setZoom] = React.useState(defaultZoom);
//   const [width, height] = useWindowSize();

  const [appRef, { x, y, width }] = useDimensions();



  useEffect(() => {

    let height = width;

    let calculate = function(width, height) {
      return width / 711 < height / 300 ? width / 711 : height / 300;
    };
    setDefaultZoom(calculate(width, height) || 2.7);
    setZoom(calculate(width, height) || 2.7);
  }, [width]);




  return (
    <div className="leaflet-container" ref={appRef}>
      <Map
        center={defaultCenter}
        length={4}
        // onClick={this.handleClick}
        // onLocationfound={this.handleLocationFound}
        // ref={this.mapRef}
        zoom={13}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

      </Map>
    </div>
  );
}