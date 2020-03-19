import React from "react";
import BinsCovidExpanded from "./BinsCovidExpanded";
import ProteinsCovidExpanded from "./ProteinsCovidExpanded";
import { Button, ButtonGroup } from "react-bootstrap";

const CompareRow = ({
  covidEntropy,
  binSize,
  aminoacid,
  position,
  covidEntropyBins,
  width,
  setPosition,
  proteinsCovid,
  handleProteinClick
}) => {
  const aa = aminoacid;

  const compare = aa + "_AA+";
  const compareN = aa + "_NUCL";

  console.log(compareN);

  // NC_045512.2_group_1_NUCL,NC_045512.2_group_1_AA+

  const sliced = covidEntropy.slice(position - 1, position - 1 + binSize);

  const nextBin = () => {
    if (position === covidEntropyBins[covidEntropyBins.length - 1].position) {
      setPosition(1);
    } else {
      setPosition(position + binSize);
    }
  };

  const previousBin = () => {
    if (position === 1) {
      setPosition(covidEntropyBins[covidEntropyBins.length - 1].position);
    } else {
      setPosition(position - binSize);
    }
  };

  return (
    <>
      <svg width="100%" height="50px">
        <g transform="translate(5, 20)">
          <ProteinsCovidExpanded
            data={proteinsCovid}
            width={width}
            handleBinClick={handleProteinClick}
            max={covidEntropy.length}
          />
        </g>
      </svg>
      <svg width="100%" height="50px">
        <g transform="translate(5, 20)">
          <BinsCovidExpanded
            data={covidEntropyBins}
            width={width}
            position={position}
            // name={mtList[0].name}
            axis={true}
            tooltip={false}
            // setBinsColorScale={setBinsColorScale}
            aa="NC_045512.2_group_1"
            // maxAAEntropy={maxAAEntropy}
          />
        </g>
      </svg>

      <div className="row svgrow">
        <svg
          style={
            binSize === 500 ? { minWidth: "350rem" } : { minWidth: "180rem" }
          }
          height="150px"
        >
          <g transform={`translate(${[0, 20]})`}>
            <text y="46" x="5" fontSize="11">
              REFERENCE
            </text>
            <text y="71" x="5" fontSize="11">
              {aa.split(".")[0]}
            </text>
            <text y="118" x="5" fontSize="11">
              NUCL.
            </text>
          </g>
          <g transform={`translate(${[80, 20]})`}>
            {sliced.map((d, i) => {
              return (
                <g
                  key={d["POS"]}
                  className="nucleotide-cells"
                  transform={`translate(${[i * 10 + i, 0]})`}
                >
                  <text
                    y="20"
                    x="-7"
                    fontSize="10"
                    textAnchor="left"
                    transform="rotate(300)"
                  >
                    {d["POS"]}
                  </text>

                  <g transform={`translate(${[0, 30]})`}>
                    <rect
                      height="24"
                      width="10"
                      x="0"
                      y="0"
                      style={{ fill: "rgb(212, 212, 210)" }}
                    ></rect>
                    <text y="16" x="5" fontSize="11">
                      {d["reference AA"]}
                    </text>
                  </g>
                  <g transform={`translate(${[0, 55]})`}>
                    <rect
                      height="24"
                      width="10"
                      x="0"
                      y="0"
                      style={
                        d["reference AA"] === d[compare]
                          ? { fill: "rgb(212, 212, 210)" }
                          : { fill: "red" }
                      }
                    ></rect>
                    <text y="16" x="5" fontSize="11">
                      {d[compare]}
                    </text>
                  </g>
                  <g transform={`translate(${[0, 100]})`}>
                    <rect
                      height="24"
                      width="10"
                      x="0"
                      y="0"
                      style={{ fill: "rgb(212, 212, 210)" }}
                    ></rect>
                    <text y="16" x="5" fontSize="11">
                      {d[compareN]}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
      <div className="text-center mt-4 mb-4">
        <ButtonGroup aria-label="Basic example">
          <Button variant="secondary" onClick={previousBin}>
            {"< Previous bin"}
          </Button>
          <Button variant="secondary" onClick={nextBin}>
            {"Next bin >"}
          </Button>
        </ButtonGroup>
      </div>
    </>
  );
};

export default CompareRow;
