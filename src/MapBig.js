import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import {
  Map,
  TileLayer,
  // Marker,
  // Circle,
  CircleMarker,
  Popup
} from "react-leaflet";
import useDimensions from "react-use-dimensions";

const MapCustom = () => {
  const [zoom, setZoom] = useState(2.3);
  const [el, setEl] = useState("");

  const [mapEl, { width }] = useDimensions();

  const getEl = React.useCallback(data => {
    let markerPosition = [25.505, -0.09];
    let color = "red";
    let radius = 5;

    const calculateRadius = Confirmed => {
      let radius;

      if (Confirmed > 50000) {
        radius = 20;
      } else if (Confirmed > 1000) {
        radius = 15;
      } else if (Confirmed > 50) {
        radius = 10;
      } else {
        radius = 5;
      }

      return radius;
    };

    // attributes:
    // OBJECTID: 27
    // Country_Region: "Mainland China"
    // Last_Update: 1582264984000
    // Lat: 30.5928
    // Long_: 114.3055
    // Confirmed: 79826
    // Deaths: 2870
    // Recovered: 42070

    return (
      <Map center={[25.505, -0.09]} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
        />

        {data.length &&
          data.map(d => {
            return (
              <CircleMarker
                key={d.attributes.OBJECTID}
                center={[d.attributes.Lat, d.attributes.Long_]}
                color={"red"}
                radius={calculateRadius(d.attributes.Confirmed)}
                stroke={false}
                fillOpacity={0.5}
              >
                <Popup>
                  {data ? (
                    <div>
                      Country/Region: {d.attributes.Country_Region} <br />
                      Confirmed cases: {d.attributes.Confirmed} <br />
                      Deaths: {d.attributes.Deaths} <br />
                      Recovered: {d.attributes.Recovered}
                    </div>
                  ) : (
                    "No data"
                  )}
                </Popup>
              </CircleMarker>
            );
          })}
      </Map>
    );
  }, []);

  useEffect(() => {
    let calculate = function(width) {
      return width / 300;
    };

    d3.json(
      "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/2/query?f=json&where=Confirmed%20%3E%200&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Confirmed%20desc&resultOffset=0&resultRecordCount=100&cacheHint=true"
    ).then(data => {
      setEl(getEl(data.features));
    });

    setZoom(calculate(width) || 2.3);
  }, []);

  return <div ref={mapEl}>{el}</div>;
};

export default MapCustom;

//
