import React from "react";
import * as d3 from "d3";
// import ReactTooltip from "react-tooltip";


const DataMapper = ({
  covidEntropy,
  binSize,
  BinsCovid,
  aminoacid,
  position,
  covidEntropyBins,
  width,
  setPosition,
  proteinsCovid,
  handleProteinClick,
  handleStrainClick,
  handleCheckbox,
  handleBinClick,
  mainDataName,
  dataGroupList,
  groupNames,
  maxAAEntropy,
  unChecked,
  groupsLegend,
  binsColorScale,
  CheckBox,
  setSVGHeight,
}) => {

  let group = '';


    const dataGroups44 = dataGroupList.dataGroups44,
          dataGroups2 = dataGroupList.dataGroups2,
          dataGroupsBirthDeath = dataGroupList.dataGroupsBirthDeath,

          aa = aminoacid;

  console.log( mainDataName );

   if( mainDataName === "corona44" ) {

        group = dataGroups44.map((d, i) => {
          const getGroup = (groupNames, d) => {
            return groupNames
              .filter(g => {
                return d.split("_")[0] === g.split("_")[0];
              })[0]
              .split(".")[1]
              .split("_")[1];
          };

          return (
            <g
              transform={`translate(0,${i * 22})`}
              key={d}
              onClick={() => handleCheckbox(d)}
            >
              <CheckBox
                name={d}
                active={unChecked.indexOf(d) === -1}
                group={getGroup(groupNames, d)}
                groupsLegend={groupsLegend}
                handleStrainClick={handleStrainClick}
              />
              {covidEntropyBins.length && (
                <g transform="translate(120,0)">
                  <BinsCovid
                    handleBinClick={handleBinClick}
                    data={covidEntropyBins}
                    width={width}
                    // name={d.name}
                    axis={false}
                    tooltip={true}
                    binsColorScale={binsColorScale}
                    aa={d}
                    maxAAEntropy={maxAAEntropy}
                  />
                </g>
              )}
            </g>
          );
        });

      } else if ( mainDataName === "coronabirthdeath" ) {

        group = dataGroupsBirthDeath.map((d, i) => {
          const getGroup = (groupNames, d) => {

            var filteredGroups = groupNames
                                .filter( g  => {
                                  return d.split("_")[0] === g.split("_")[0];
                                })[0],
                group = '';

          if( typeof filteredGroups != 'undefined' ) {
                group = filteredGroups
                          .split(".")[1]
                          .split("_")[1];
          }

            return group;
              
          };

          console.log( groupNames );
          console.log( d );
          console.log( getGroup(groupNames, d) );

          return (
            <g
              transform={`translate(0,${i * 22})`}
              key={d}
              onClick={() => handleCheckbox(d)}
            >
              <CheckBox
                name={d}
                active={unChecked.indexOf(d) === -1}
                group={getGroup(groupNames, d)}
                groupsLegend={groupsLegend}
                handleStrainClick={handleStrainClick}
              />
              {covidEntropyBins.length && (
                <g transform="translate(120,0)">
                  <BinsCovid
                    handleBinClick={handleBinClick}
                    data={covidEntropyBins}
                    width={width}
                    // name={d.name}
                    axis={false}
                    tooltip={true}
                    binsColorScale={binsColorScale}
                    aa={d}
                    maxAAEntropy={maxAAEntropy}
                  />
                </g>
              )}
            </g>
          );

        });

      } else { 

        group = dataGroups2.map((d, i) => {
          // const getGroup = (groupNames, d) => {
          //   return groupNames
          //     .filter(g => {
          //       return d.split("_")[0] === g.split("_")[0];
          //     })[0]
          //     .split(".")[1]
          //     .split("_")[1];
          // };

          return (
            <g
              transform={`translate(0,${i * 22})`}
              key={d}
              onClick={() => handleCheckbox(d)}
            >
              <CheckBox
                name={d}
                active={unChecked.indexOf(d) === -1}
                // group={getGroup(groupNames, d)}
                groupsLegend={groupsLegend}
                handleStrainClick={handleStrainClick}
                covid={true}
              />
              {covidEntropyBins.length && (
                <g transform="translate(120,0)">
                  <BinsCovid
                    handleBinClick={handleBinClick}
                    data={covidEntropyBins}
                    width={width}
                    // name={d.name}
                    axis={false}
                    tooltip={true}
                    binsColorScale={binsColorScale}
                    aa={d}
                    maxAAEntropy={maxAAEntropy}
                  />
                </g>
              )}
            </g>
          );
        });
      }

      setSVGHeight( ( group.length * 22 ) + 150 );

      return (

        <>
          {group}
        </>

      );

};

export default DataMapper;