import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

import seqnavLogo from "./images/seqnavLogo.png";
import analyze from "./images/analyze.png";
import learn from "./images/learn.png";
import phylogeny from "./images/phylogeny.png";
import alingment from "./images/alingment.png";
import proteinCompare from "./images/proteinCompare.png";
import map from "./images/map.png";

const Header = ({
  setShowTree,
  setShowBigMap,
  setShowProteinCompare,
  setMainDataName
}) => {
  return (
    <>
      <Navbar className="justify-content-between">
        <Navbar.Brand href="#home">
          <img
            src={seqnavLogo}
            width="150"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        {/* className="justify-content-end" */}

        {/* <Nav className="mr-auto">

        </Nav> */}

        <Nav>
          <Nav.Item as="li">
            <Nav.Link href="#" className="main-nav">
              EBOLA
            </Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link href="#" className="main-nav" active>
              CORONA
            </Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link href="#" className="main-nav">
              DENGUE
            </Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link href="#" className="main-nav">
              POLIO
            </Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link href="#" className="main-nav">
              RHINO
            </Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link href="#" className="main-nav">
              FLU
            </Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link href="https://pine-biotech.com/" className="main-nav">
              About
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>

      <Navbar
        style={{ background: "#5E5E5E", marginRight: -15, marginLeft: -15 }}
      >
        <Navbar.Collapse>
          <span className="grayTitle" style={{ marginLeft: "25px" }}>
            DISCOVER:
          </span>
          <a href="https://server.t-bio.info/" className="grayGroup">
            <img src={analyze} alt="seqnavLogo" className="linkImg" />
            <span className="grayLink">analyze</span>
          </a>
          <a href="https://edu.t-bio.info/" className="grayGroup">
            <img src={learn} alt="seqnavLogo" className="linkImg" />
            <span className="grayLink">learn</span>
          </a>{" "}
          <NavDropdown title="DATA" id="basic-nav-dropdown">
            <NavDropdown.Item onClick={() => setMainDataName("corona44")}>
              Comparison between 44 coronavirus genomes
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => setMainDataName("corona2")}>
              COVID 19 human genomic sequences
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => setMainDataName("coronabirthdeath")}>
              Comparison Birth Death coronavirus
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => setMainDataName("pangolinhumansars")}>
              BAT Pangolin Human SARS
            </NavDropdown.Item>
          </NavDropdown>
          {/* <NavDropdown.Item href="./covid-19/corona44.tsv">
              44 strains data
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="./covid-19/COVID19-gbMN908947-3.csv">
              Proteins data
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="./covid-19/sample_data.csv">
              Strain info data
            </NavDropdown.Item>
          </NavDropdown> */}
        </Navbar.Collapse>

        <Navbar.Collapse className="justify-content-end">
          <span className="grayTitle">VISUALIZE:</span>

          <a href="#" className="grayGroup" onClick={() => setShowTree(true)}>
            <img src={phylogeny} alt="phylogeny" className="linkImg" />
            <span className="grayLink">phylogeny</span>
          </a>
          <a href="#" className="grayGroup selectedNav">
            <img src={alingment} alt="alingment" className="linkImg" />
            <span className="grayLink">alignment</span>
          </a>
          <a
            href="#"
            className="grayGroup"
            onClick={() => setShowProteinCompare(true)}
          >
            <img
              src={proteinCompare}
              alt="proteinCompare"
              className="linkImg"
            />
            <span className="grayLink">protein compare</span>
          </a>
          <a href="#" className="grayGroup" onClick={() => setShowBigMap(true)}>
            <img src={map} alt="map" className="linkImg" />
            <span className="grayLink">map</span>
          </a>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
