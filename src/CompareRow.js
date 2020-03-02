import React from "react";

const CompareRow = ({ covidEntropy, binSize, expandedViewData }) => {
  const { aa, position } = expandedViewData;

  const compare = aa + "_AA+";

  const sliced = covidEntropy.slice(position - 1, position - 1 + binSize);

  return (
    <div className="row svgrow">
      <svg
        style={
          binSize === 500 ? { minWidth: "350rem" } : { minWidth: "180rem" }
        }
        height="200px"
      >
        <g transform={`translate(${[0, 20]})`}>
          <text y="46" x="5" fontSize="11">
            REFERENCE
          </text>
          <text y="71" x="5" fontSize="11">
            {aa.split(".")[0]}
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
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default CompareRow;
