import React, { useEffect, useState } from "react";
import * as d3 from "d3";
// import { tsvParseRows } from "d3-dsv";
import "bootstrap/dist/css/bootstrap.min.css";
// import Bins from "./Bins";
// import BinsModal from "./BinsModal";
import BinsCovid from "./BinsCovid";

import CheckBox from "./CheckBox";
// import Linechart from "./Linechart";
// import LinechartModal from "./LinechartModal";
import ReactTooltip from "react-tooltip";
import ProteinsCovid from "./ProteinsCovid";
import Header from "./Header";
import MapCustom from "./MapCustom";
import MapBig from "./MapBig";
import CompareRow from "./CompareRow";

import {
  //Button,
  Spinner,
  Form,
  //Table,
  ListGroup,
  Container,
  Row,
  Col
  //Nav
} from "react-bootstrap";
import CustomModal from "./CustomModal";
import InfoIcon from "./InfoIcon";
import useDimensions from "react-use-dimensions";
import "./App.css";

// const formatNum = num => {
//   return num.toFixed(0).replace(/\d(?=(\d{3})+\.)/g, "$&,");
// };

function App() {
  // const [humanb_proteins, setHumanb_proteins] = useState([]);
  // const [dengueproteins, setDengueproteins] = useState([]);
  // const [d7, setD7] = useState([]);
  // const [d8, setD8] = useState([]);
  // const [d9, setD9] = useState([]);

  const [unChecked, setUnChecked] = useState([]);

  // const [mtList, setMtlist] = useState([]);

  // const [binData, setBinData] = useState([]);

  const [modalShow, setModalShow] = useState(false);

  const [modalStrainShow, setModalStrainShow] = useState(false);

  const [binSize, setBinSize] = useState(500);

  const [appRef, { width }] = useDimensions();

  // const [averageData, setAverageData] = useState([]);

  const [modalWidth, setModalWidth] = useState([]);

  // const [startingPoint, setStartingPoint] = useState(null);

  const [binsColorScale, setBinsColorScale] = useState(null);

  const [covidEntropy, setCovidEntropy] = useState([]);

  const [covidEntropyBins, setCovidEntropyBins] = useState([]);

  const [maxAAEntropy, setMaxAAEntropy] = useState(0);

  const [proteinsCovid, setProteinsCovid] = useState([]);

  const [proteinInfo, setProteinInfo] = useState({});

  const [strainInfoData, setStrainInfoData] = useState([]);

  const [strainInfo, setStrainInfo] = useState({});

  const [showTree, setShowTree] = useState(false);

  const [showProteinsModal, setShowProteinsModal] = useState(false);

  const [showBigMap, setShowBigMap] = useState(false);

  const [showBinsModal, setShowBinsModal] = useState(false);

  const [showProteinCompare, setShowProteinCompare] = useState(false);

  // const [expandedViewData, setExpandedViewData] = useState({});

  const [aminoacid, setAminoacid] = useState(null);
  const [position, setPosition] = useState(null);

  let groupsLegend = {
    "COVID-19": "red",
    SARS: "pink",
    BetaCOV: "green",
    MERS: "orange"
  };

  // let dataGroups = [
  //   "MN996527.1_group_1",
  //   "MN996530.1_group_1",
  //   "MN996531.1_group_1",
  //   "MT007544.1_group_1",
  //   "MN908947.3_group_1",
  //   "MT019529.1_group_1",
  //   "MT039887.1_group_1",
  //   "LC522975.1_group_1",
  //   "LC522974.1_group_1",
  //   "MN997409.1_group_1",
  //   "MN985325.1_group_1",
  //   "MN988713.1_group_1",
  //   "MN994467.1_group_1",
  //   "LC521925.1_group_1",
  //   "LC522972.1_group_1",
  //   "MN996528.1_group_1",
  //   "MT027062.1_group_1",
  //   "MT027063.1_group_1",
  //   "MT039888.1_group_1",
  //   "MT019532.1_group_1",
  //   "MT039873.1_group_1",
  //   "MN994468.1_group_1",
  //   "MT019531.1_group_1",
  //   "MT019530.1_group_1",
  //   "MT027064.1_group_1",
  //   "MN996529.1_group_1",
  //   "MT020781.1_group_1"
  // ];
  let dataGroups44 = [
    "NC_045512.2_group_1",
    "AY278554.2_group_1",
    "AY304495.1_group_1",
    "AY278488.2_group_1",
    "AY278487.3_group_1",
    "AY613947.1_group_1",
    "KX538972.1_group_1",
    "KX538976.1_group_1",
    "KX538966.1_group_1",
    "KF923904.1_group_1",
    "KX538964.1_group_1",
    "KX538970.1_group_1",
    "KX538979.1_group_1",
    "KX538978.1_group_1",
    "KY967356.1_group_1",
    "MH685718.1_group_1",
    "KY967359.1_group_1",
    "KY983583.1_group_1",
    "MF374984.1_group_1",
    "MN306053.1_group_1",
    "MN310478.1_group_1",
    "KP198611.1_group_1",
    "KU131570.1_group_1",
    "KF923906.1_group_1",
    "KF530072.1_group_1",
    "KF530080.1_group_1",
    "KF530060.1_group_1",
    "KF530077.1_group_1",
    "KF530066.1_group_1",
    "KF530059.1_group_1",
    "KC667074.1_group_1",
    "KF192507.1_group_1",
    "KF600636.1_group_1",
    "KJ156876.1_group_1",
    "KF186564.1_group_1",
    "KF600630.1_group_1",
    "KP209312.1_group_1",
    "KT156560.1_group_1",
    "KT156561.1_group_1",
    "KM015348.1_group_1",
    "KM210278.1_group_1",
    "KM210277.1_group_1",
    "KR011266.1_group_1",
    "KF600620.1_group_1"
  ];

  let groupNames = [
    "AY278487.3_SARS",
    "AY278488.2_SARS",
    "AY278554.2_SARS",
    "AY304495.1_SARS",
    "AY613947.1_SARS",
    "KC667074.1_MERS",
    "KF186564.1_MERS",
    "KF192507.1_MERS",
    "KF530059.1_BetaCOV_1",
    "KF530060.1_BetaCOV_1",
    "KF530066.1_BetaCOV_1",
    "KF530072.1_BetaCOV_1",
    "KF530077.1_BetaCOV_1",
    "KF530080.1_BetaCOV_1",
    "KF600620.1_MERS",
    "KF600630.1_MERS",
    "KF600636.1_MERS",
    "KF923904.1_BetaCOV_1",
    "KF923906.1_BetaCOV_1",
    "KJ156876.1_MERS",
    "KM015348.1_MERS",
    "KM210277.1_MERS",
    "KM210278.1_MERS",
    "KP198611.1_BetaCOV_1",
    "KP209312.1_MERS",
    "KR011266.1_MERS",
    "KT156560.1_MERS",
    "KT156561.1_MERS",
    "KU131570.1_BetaCOV_1",
    "KX538964.1_BetaCOV_1",
    "KX538966.1_BetaCOV_1",
    "KX538970.1_BetaCOV_1",
    "KX538972.1_BetaCOV_1",
    "KX538976.1_BetaCOV_1",
    "KX538978.1_BetaCOV_1",
    "KX538979.1_BetaCOV_1",
    "KY967356.1_BetaCOV_1",
    "KY967359.1_BetaCOV_1",
    "KY983583.1_BetaCOV_1",
    "MF374984.1_BetaCOV_1",
    "MH685718.1_BetaCOV_1",
    "MN306053.1_BetaCOV_1",
    "MN310478.1_BetaCOV_1",
    "NC_045512.2_COVID-19_Wuhan"
  ];

  const handleBinClick = React.useCallback((d, aa) => {
    // setStartingPoint(d.position);
    setShowBinsModal(true);

    setAminoacid(aa);
    setPosition(d.position);
  }, []);

  const handleProteinClick = React.useCallback(d => {
    //setModalShow(true);

    setProteinInfo(d);
    setModalShow(true);
  }, []);

  const handleStrainClick = d => {
    let selected = strainInfoData.filter(s => {
      return d === s.Accession;
    });

    setModalStrainShow(true);

    setStrainInfo(selected[0]);
  };

  const handleCheckbox = name => {
    if (unChecked.indexOf(name) === -1) {
      setUnChecked(list => [...list, name]);
    } else {
      setUnChecked(list => [...list.filter(d => d !== name)]);
    }
  };

  // const dispense = React.useCallback(candy => {
  //   setCandies(allCandies => allCandies.filter(c => c !== candy))
  // }, [])

  const createBinsArrayCovid = React.useCallback(
    (data, binSize = 500) => {
      let maxAAEntropy = 0;

      let num = 0;
      let bin = {
        position: 1,
        NTEntropySum: 0,
        AAEntropySum: 0
      };

      dataGroups44.forEach(d => {
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

          dataGroups44.forEach(a => {
            if (bin[a + "_AA+"] > maxAAEntropy) {
              maxAAEntropy = bin[a + "_AA+"];
            }
          });

          dataGroups44.forEach(a => {
            bin[a + "_AA+"] = 0;
          });
        }

        // AA entropy

        bin.NTEntropySum = bin.NTEntropySum += +d["NT entropy"];
        bin.AAEntropySum = bin.AAEntropySum += +d["AA entropy"];

        dataGroups44.forEach(a => {
          if (d[a + "_AA+"] !== d["reference AA"]) {
            bin[a + "_AA+"] += 1;
          }
        });
      });

      setMaxAAEntropy(maxAAEntropy);
      return bins;
    },
    [dataGroups44]
  );

  useEffect(() => {
    // d3.csv("./covid-19/nCOVID-19_entropy.csv").then(data => {
    //   setCovidEntropy(data);
    // });

    d3.tsv("./covid-19/corona44.tsv").then(data => {
      setCovidEntropy(data);
    });

    d3.csv("./covid-19/COVID19-gbMN908947-3.csv").then(proteins => {
      setProteinsCovid(proteins);
    });

    d3.csv("./covid-19/sample_data.csv").then(data => {
      setStrainInfoData(data);
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
    <Container fluid="true">
      <div className="App">
        <Header
          setShowTree={setShowTree}
          setShowBigMap={setShowBigMap}
          setShowProteinCompare={setShowProteinCompare}
        />

        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              {/* <div className="form-group">
              <span class="helper"></span> */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  minHeight: "60px"
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
            <div className="col-sm-8">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  minHeight: "60px"
                }}
              >
                Legend: COVID-19
                <div
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: "red",
                    marginRight: 15,
                    marginLeft: 5
                  }}
                />
                SARS
                <div
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: "pink",
                    marginRight: 15,
                    marginLeft: 5
                  }}
                />
                BetaCOV
                <div
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: "green",
                    marginRight: 15,
                    marginLeft: 5
                  }}
                />
                MERS
                <div
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: "orange",
                    marginRight: 15,
                    marginLeft: 5
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {!covidEntropy.length &&
        !covidEntropyBins.length &&
        !proteinInfo.length &&
        !maxAAEntropy ? (
          <Spinner animation="border" role="status" className="spinner">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          <div ref={appRef}>
            <svg width="100%" height="1120">
              <g transform={`translate(18,10)`}>
                <g
                  className="pointer"
                  onClick={() => setShowProteinsModal(true)}
                >
                  <InfoIcon />
                  <text transform={`translate(22,16)`}>Proteins</text>
                </g>
                <g transform={`translate(120,0)`}>
                  {width && (
                    <ProteinsCovid
                      data={proteinsCovid}
                      width={width}
                      handleBinClick={handleProteinClick}
                      max={covidEntropy.length}
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
                    aa="NC_045512.2_group_1"
                    maxAAEntropy={maxAAEntropy}
                  />
                </g>
              </g>

              <g transform={`translate(18,140)`}>
                {width &&
                  dataGroups44.map((d, i) => {
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
                  dataGroups44.map((d, i) => {
                    // let groupNames = [
                    //   "AY278487.3_SARS",

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
            modalTitle={`Protein view: ${proteinInfo.product.toUpperCase()}`}
          >
            <div className="row">
              <div className="col-sm-6">
                <ListGroup variant="flush">
                  {/* <ListGroup.Item>
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
                  </ListGroup.Item> */}
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
                  <Row>
                    <Col>Product: {proteinInfo.product}</Col>
                    <Col>Protein ID: {proteinInfo.protein_id}</Col>
                  </Row>
                  <Row>
                    <Col>
                      Start position: {(+proteinInfo.start).toLocaleString()}
                    </Col>
                    <Col>
                      End position: {(+proteinInfo.end).toLocaleString()}
                    </Col>
                    <Col>
                      Protein Length:{" "}
                      {(+proteinInfo["protein length"]).toLocaleString()}
                    </Col>
                  </Row>
                </div>
              )}
            </div>
          </CustomModal>
        )}

        {/* strain modal */}
        <CustomModal
          show={modalStrainShow}
          onHide={() => setModalStrainShow(false)}
          setModalWidth={setModalWidth}
          // values={[startingPoint, startingPoint - 1 + binSize]}
          modalTitle={!strainInfo ? "No data" : strainInfo.Accession}
        >
          {!strainInfo ? (
            <ListGroup variant="flush">
              <ListGroup.Item>Data coming soon</ListGroup.Item>
            </ListGroup>
          ) : (
            <div className="row">
              <div className="col-sm-6">
                <ListGroup variant="flush">
                  <ListGroup.Item>Strain: {strainInfo.Strain}</ListGroup.Item>
                  <ListGroup.Item>Country: {strainInfo.country}</ListGroup.Item>
                  <ListGroup.Item>Host: {strainInfo["host"]}</ListGroup.Item>
                  <ListGroup.Item>Region: {strainInfo.region}</ListGroup.Item>
                  <ListGroup.Item>
                    Virus species: {strainInfo["virus species"]}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Accession: {strainInfo.Accession}
                  </ListGroup.Item>
                  <ListGroup.Item>Group: {strainInfo.Group}</ListGroup.Item>
                </ListGroup>
              </div>
              <div className="col-sm-6">
                <MapCustom
                  region={strainInfo.region}
                  strainInfo={strainInfo}
                  groupsLegend={groupsLegend}
                />
              </div>
            </div>
          )}
        </CustomModal>

        {/* tree */}
        <CustomModal
          show={showTree}
          onHide={() => setShowTree(false)}
          setModalWidth={setModalWidth}
          modalTitle="Phylogenetic tree"
        >
          <iframe
            title="ngl-view"
            src={`./covid-19/phylotree/index.html`}
            width="100%"
            height="740"
            frameBorder="0"
          />
        </CustomModal>

        {/* proteins modal */}

        <CustomModal
          show={showProteinsModal}
          onHide={() => setShowProteinsModal(false)}
          setModalWidth={setModalWidth}
          product="asdf"
          modalTitle="Proteins"
        >
          <iframe
            title="proteins-page"
            width="100%"
            height="740"
            frameBorder="0"
            src="https://www.ncbi.nlm.nih.gov/nuccore/NC_045512.2?report=graph"
          ></iframe>
        </CustomModal>
        {/* end proteins modal */}

        {/* big map modal */}

        <CustomModal
          show={showBigMap}
          onHide={() => setShowBigMap(false)}
          setModalWidth={setModalWidth}
          modalTitle="Map"
        >
          <MapBig />
        </CustomModal>

        {/* end big map modal */}

        {/* bins modal */}

        <CustomModal
          show={showBinsModal}
          onHide={() => setShowBinsModal(false)}
          setModalWidth={setModalWidth}
          modalTitle="Expanded View"
        >
          {aminoacid && (
            <CompareRow
              binSize={binSize}
              covidEntropy={covidEntropy}
              aminoacid={aminoacid}
              position={position}
              covidEntropyBins={covidEntropyBins}
              width={width}
              setPosition={setPosition}
            />
          )}

          <div width="100%" height="500px"></div>
        </CustomModal>

        {/* end bins modal */}

        {/* protein-compare */}
        <CustomModal
          show={showProteinCompare}
          onHide={() => setShowProteinCompare(false)}
          setModalWidth={setModalWidth}
          product="asdf"
          modalTitle="Protein Compare"
        >
          <iframe
            title="ngl-view"
            src={`./covid-19/protein-compare/index.html`}
            width="100%"
            height="700"
            frameBorder="0"
          />
        </CustomModal>
        {/* end protein-compare */}
      </div>
      <p className="text-center mt-4 mb-4">
        © Copyright 2020 | Pine Biotech, Inc.
      </p>
    </Container>
  );
}

export default App;
