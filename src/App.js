import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { tsvParseRows } from "d3-dsv";
import "bootstrap/dist/css/bootstrap.min.css";
import Bins from "./Bins";
import BinsModal from "./BinsModal";
import BinsCovid from "./BinsCovid";
import CheckBox from "./CheckBox";
import Linechart from "./Linechart";
import LinechartModal from "./LinechartModal";
import ReactTooltip from "react-tooltip";
import ProteinsCovid from "./ProteinsCovid";
import Header from "./Header";

import {
  Button,
  Spinner,
  Form,
  Table,
  ListGroup,
  Container,
  Row,
  Col,
  Nav
} from "react-bootstrap";
import CustomModal from "./CustomModal";
import InfoIcon from "./InfoIcon";
import useDimensions from "react-use-dimensions";
import "./App.css";

const formatNum = num => {
  return num.toFixed(0).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

function App() {
  // const [humanb_proteins, setHumanb_proteins] = useState([]);
  // const [dengueproteins, setDengueproteins] = useState([]);
  // const [d7, setD7] = useState([]);
  // const [d8, setD8] = useState([]);
  // const [d9, setD9] = useState([]);

  const [unChecked, setUnChecked] = useState([]);

  const [mtList, setMtlist] = useState([]);

  const [binData, setBinData] = useState([]);

  const [modalShow, setModalShow] = useState(false);

  const [binSize, setBinSize] = useState(500);

  const [appRef, { x, y, width }] = useDimensions();

  const [averageData, setAverageData] = useState([]);

  const [modalWidth, setModalWidth] = useState([]);

  const [startingPoint, setStartingPoint] = useState(null);

  const [binsColorScale, setBinsColorScale] = useState(null);

  const [covidEntropy, setCovidEntropy] = useState([]);

  const [covidEntropyBins, setCovidEntropyBins] = useState([]);

  const [maxAAEntropy, setMaxAAEntropy] = useState(0);

  const [proteinsCovid, setProteinsCovid] = useState([]);

  const [proteinInfo, setProteinInfo] = useState({});

  let dataGroups = [
    "MN996527.1_group_1",
    "MN996530.1_group_1",
    "MN996531.1_group_1",
    "MT007544.1_group_1",
    "MN908947.3_group_1",
    "MT019529.1_group_1",
    "MT039887.1_group_1",
    "LC522975.1_group_1",
    "LC522974.1_group_1",
    "MN997409.1_group_1",
    "MN985325.1_group_1",
    "MN988713.1_group_1",
    "MN994467.1_group_1",
    "LC521925.1_group_1",
    "LC522972.1_group_1",
    "MN996528.1_group_1",
    "MT027062.1_group_1",
    "MT027063.1_group_1",
    "MT039888.1_group_1",
    "MT019532.1_group_1",
    "MT039873.1_group_1",
    "MN994468.1_group_1",
    "MT019531.1_group_1",
    "MT019530.1_group_1",
    "MT027064.1_group_1",
    "MN996529.1_group_1",
    "MT020781.1_group_1"
  ];

  const handleBinClick = d => {
    // setStartingPoint(d.position);
    // setModalShow(true);
  };

  const handleProteinClick = d => {
    //setModalShow(true);

    console.log(d);
    setProteinInfo(d);
    setModalShow(true);
  };

  const handleCheckbox = name => {
    if (unChecked.indexOf(name) === -1) {
      setUnChecked(list => [...list, name]);
    } else {
      setUnChecked(list => [...list.filter(d => d !== name)]);
    }
  };

  const createBinsArrayCovid = (data, binSize = 100) => {
    let maxAAEntropy = 0;


    let num = 0;
    let bin = {
      position: 1,
      NTEntropySum: 0,
      AAEntropySum: 0
    };

    dataGroups.forEach(d => {
      bin[d + "_AA+"] = 0;
    });

    let bins = [];

    data.forEach((d, i) => {
      //AAEntropySum += +d["AA entropy"];

      // end bin
      if (d.POS === data.length) {
        bins.push(bin);
      }

      // check if end of bin
      if (d.POS > num + binSize) {
        num += binSize;
        bins.push(bin);

        // reset values for new bin
        bin = {
          ...bin,
          position: num + 1,
          NTEntropySum: 0,
          AAEntropySum: 0
        };

        dataGroups.forEach(a => {
          if (bin[a + "_AA+"] > maxAAEntropy) {
            maxAAEntropy = bin[a + "_AA+"];
          }
        });

        dataGroups.forEach(a => {
          bin[a + "_AA+"] = 0;
        });
      }

      // AA entropy

      bin.NTEntropySum = bin.NTEntropySum += +d["NT entropy"];
      bin.AAEntropySum = bin.AAEntropySum += +d["AA entropy"];

      dataGroups.forEach(a => {
        if (d[a + "_AA+"] !== d["reference AA"]) {
          bin[a + "_AA+"] += 1;
        }
      });
    });

    setMaxAAEntropy(maxAAEntropy);
    return bins;
  };

  useEffect(() => {
    d3.csv("./covid-19/nCOVID-19_entropy.csv").then(data => {
      setCovidEntropy(data);
    });

    d3.csv("./covid-19/COVID19-gbMN908947-3.csv").then(proteins => {
      setProteinsCovid(proteins);
    });
  }, []);

  useEffect(() => {
    setCovidEntropyBins(createBinsArrayCovid(covidEntropy, binSize));

    // let changesTotal = createBinsArrayCovid(covidEntropy, 500).reduce((acc,cur) => {
    //   dataGroups
    // })

    // setAverageData(averageData);
  }, [binSize, covidEntropy]);

  return (
    <Container fluid="true" >
      <div className="App">
        <Header />

        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              {/* <div className="form-group">
              <span class="helper"></span> */}
              <div
                style={{
                  display: "flex",
                  "alignItems": "center",
                  "minHeight": "60px"
                }}
              >
                <div style={{ margin: "5px" }}>Bin size: </div>
                <Form.Control
                  style={{ width: "70px" }}
                  as="select"
                  size="sm"
                  onChange={e => setBinSize(+e.target.value)}
                >
                  <option>500</option>
                  <option>250</option>
                </Form.Control>
              </div>
              {/* </div> */}
            </div>
            <div className="col-sm-8"></div>
          </div>
        </div>

        {!covidEntropy.length && !covidEntropyBins.length && !proteinInfo.length ? (
          <Spinner animation="border" role="status" className="spinner">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          <div ref={appRef}>
            <svg width="100%" height="900">

              <g transform={`translate(18,10)`}>
                <InfoIcon />
                <text transform={`translate(22,16)`}>Proteins</text>
                <g transform={`translate(120,0)`}>
                  {width && (
                    <ProteinsCovid
                      data={proteinsCovid}
                      width={width}
                      handleBinClick={handleProteinClick}
                    />
                  )}
                </g>
              </g>

              <g transform={`translate(18,100)`}>
                <InfoIcon />
                <text transform={`translate(22,16)`}>Reference</text>
                <g transform={`translate(120,0)`}>
                  <BinsCovid
                    data={covidEntropyBins}
                    width={width}
                    // name={mtList[0].name}
                    axis={true}
                    tooltip={false}
                    setBinsColorScale={setBinsColorScale}
                    aa="MT019530.1_group_1"
                    maxAAEntropy={maxAAEntropy}
                  />
                </g>
              </g>

              <g transform={`translate(18,140)`}>
                {width &&
                  dataGroups.map((d, i) => {
                    return (
                      <g
                        transform={`translate(120,${i * 22})`}
                        key={d + "_bins"}
                      >
                        {covidEntropyBins.length && (
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
                        )}
                      </g>
                    );
                  })}
                {width &&
                  dataGroups.map((d, i) => {
                    return (
                      <g
                        transform={`translate(0,${i * 22})`}
                        key={d}
                        onClick={() => handleCheckbox(d)}
                      >
                        <CheckBox
                          name={d}
                          active={unChecked.indexOf(d) === -1}
                          // color={colors[i]}
                        />
                      </g>
                    );
                  })}
              </g>
            </svg>
          </div>
        )}
        <ReactTooltip
          // type="light"
          html={true}
          className="tooltipMain"
          id="svgTooltip"
        />

        {proteinInfo.product && (
          <CustomModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            setModalWidth={setModalWidth}
            // values={[startingPoint, startingPoint - 1 + binSize]}
            product={proteinInfo.product}
          >
            <div className="row">
              <div className="col-sm-6">

                <ListGroup variant="flush">
                  <ListGroup.Item>
                    Start position: {(+proteinInfo.start).toLocaleString()}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    End position: {(+proteinInfo.end).toLocaleString()}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Protein Length:{" "}
                    {(+proteinInfo["protein length"]).toLocaleString()}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Product: {proteinInfo.product}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Protein ID: {proteinInfo.protein_id}
                  </ListGroup.Item>
                  {proteinInfo.description && (
                    <ListGroup.Item>
                      Description: {proteinInfo.description}
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </div>

              {proteinInfo.protein_id && (
                <div className="col-sm-6">
                  <iframe
                    title="ngl-view"
                    src={`./covid-19/ngl/index.html?pdb=${proteinInfo.protein_id
                      .split("|")[1]
                      .replace(".", "_")}`}
                    width="100%"
                    height="550"
                    frameBorder="0"
                  />
                </div>
              )}
            </div>


          </CustomModal>
        )}
      </div>
    </Container>
  );
}

export default App;
