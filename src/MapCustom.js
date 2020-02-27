import React, { useEffect, useState } from "react";
import { Map, TileLayer, Marker } from "react-leaflet";

const MapCustom = () => {
  const [zoom, setZoom] = useState(2.7);
  const [el, setEl] = useState("");

  const getEl = React.useCallback(() => {
    return (
      <Map center={[51.505, -0.091]} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.091]} />
      </Map>
    );
  }, []);

  useEffect(() => {
    setZoom(10);
  }, []);

  useEffect(() => {
    setEl(getEl())
    }, [getEl])

  return <div>{el}</div>;
};

export default MapCustom;

// 
