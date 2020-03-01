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

const MapCustom = ({ region, strainInfo, groupsLegend }) => {
  const [zoom, setZoom] = useState(2);
  const [el, setEl] = useState("");

  const [mapEl, { width }] = useDimensions();

  const getEl = React.useCallback(
    filtered => {
      let markerPosition;
      let color = "red";
      let radius = 5;

      if (!filtered) {
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
      } else {
        markerPosition = [filtered.Lat, filtered.Long_];

        if (filtered.Confirmed > 50000) {
          radius = 20;
        } else if (filtered.Confirmed > 1000) {
          radius = 15;
        } else if (filtered.Confirmed > 50) {
          radius = 10;
        }  else {
          radius = 5;
        }
      }

      if (strainInfo.Group === "nCOVID-19") {
        color = "red";
      } else {
        color = groupsLegend[strainInfo.Group.split("_")[0]];
      }

      return (
        <Map center={markerPosition} zoom={zoom}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
          />

          <CircleMarker
            center={markerPosition}
            color={color}
            radius={radius}
            stroke={false}
            fillOpacity={0.5}
          >
            <Popup>
              {filtered ? (
                <div>
                  Confirmed cases: {filtered.Confirmed} <br />
                  Deaths: {filtered.Deaths} <br />
                  Recovered: {filtered.Recovered}
                </div>
              ) : (
                "No data"
              )}
            </Popup>
          </CircleMarker>
        </Map>
      );
    },
    [strainInfo.Group, zoom, region, groupsLegend]
  );

  useEffect(() => {
    let calculate = function(width) {
      return width / 300;
    };

    d3.json(
      "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/2/query?f=json&where=Confirmed%20%3E%200&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Confirmed%20desc&resultOffset=0&resultRecordCount=100&cacheHint=true"
    ).then(data => {
      let filtered = data.features.filter(d => {
        if (strainInfo.country === "China") {
          return d.attributes.Country_Region === "Mainland China";
        }
        if (strainInfo.country === "United Kingdom") {
          return d.attributes.Country_Region === "UK";
        }
        if (strainInfo.country === "USA") {
          return d.attributes.Country_Region === "US";
        }

        return d.attributes.Country_Region === strainInfo.country;
      });

      if (filtered.length === 0) {
        setEl(getEl(null));
      } else {
        setEl(getEl(filtered[0].attributes || {}));
      }
    });

    setZoom(calculate(width) || 2);
  }, [width, getEl, strainInfo]);

  return <div ref={mapEl}>{el}</div>;
};

export default MapCustom;

//
