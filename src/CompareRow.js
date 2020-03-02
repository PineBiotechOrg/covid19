import React from "react";

const CompareRow = ({ svgWidth, covidEntropy }) => {
  const referenceAA = "reference AA";
  const aa = "KX538972.1_group_1";
  const position = 5001;
  const binSize = 500;


  const compare = aa +"_AA+"

  const sliced = covidEntropy.slice(position - 1, position - 1 + binSize);

  console.log(sliced);

  return (
    <div className="row svgrow">
      <svg width="5000px" height="100px">
        <g>
          {sliced.map((d, i) => {
            return (
              <g
                key={d["POS"]}
                className="nucleotide-cells"
                transform={`translate(${[i * 10 + i, 0]})`}
              >
                <text y="20" x="-10" fontSize="10" textAnchor="left" transform="rotate(300)"> 
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
                    style={{ fill: "rgb(212, 212, 210)" }}
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
