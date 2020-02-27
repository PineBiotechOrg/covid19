import React, { useEffect, useState } from "react";
import { Map, TileLayer, Marker } from "react-leaflet";
import useDimensions from "react-use-dimensions";

const MapCustom = ({ region }) => {
  const [zoom, setZoom] = useState(1.3);
  const [el, setEl] = useState("");

  // const [markerPosition, setmarkerposition] = useState([51.505, -0.091]);

  const [mapEl, { width }] = useDimensions();

  const getEl = React.useCallback(() => {
    let markerPosition;

    if (region === "China") {
      markerPosition = [34.089061, 102.568359];
    } else if (region === "Southeast Asia") {
      markerPosition = [1.230374, 115.664063];
    } else if (region === "North America") {
      markerPosition = [47.398349, -101.074219];
    } else if (region === "Africa") {
      markerPosition = [14.264383, 15.46875];
    } else if (region === "Europe") {
      markerPosition = [46.316584, 10.371094];
    } else if (region === "West Asia") {
      markerPosition = [29.688053, 44.121094];
    } else {
      markerPosition = [25.505, -0.09];
    }

    return (
      <Map center={[25.505, -0.09]} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
        />
        <Marker position={markerPosition} />
      </Map>
    );
  }, [zoom, region]);

  useEffect(() => {
    let calculate = function(width) {
      return width / 711;
    };

    setZoom(calculate(width) || 1.3);

    setEl(getEl());
  }, [width, getEl]);

  return <div ref={mapEl}>{el}</div>;
};

export default MapCustom;

//
