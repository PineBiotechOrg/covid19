import React from "react";
import { Nav, Navbar } from "react-bootstrap";

import seqnavLogo from "./images/seqnavLogo.png";
import analyze from "./images/analyze.png";
import learn from "./images/learn.png";
import phylogeny from "./images/phylogeny.png";
import alingment from "./images/alingment.png";
import proteinCompare from "./images/proteinCompare.png";
import map from "./images/map.png";

const Header = () => {
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

        <Nav >
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
          </a>
        </Navbar.Collapse>

        <Navbar.Collapse className="justify-content-end">
          <span className="grayTitle">VISUALISE:</span>

          <a href="http://google.com" className="grayGroup">
            <img src={phylogeny} alt="phylogeny" className="linkImg" />
            <span className="grayLink">phylogeny</span>
          </a>
          <a href="#" className="grayGroup">
            <img src={alingment} alt="alingment" className="linkImg" />
            <span className="grayLink">alignment</span>
          </a>
          <a href="http://google.com" className="grayGroup">
            <img
              src={proteinCompare}
              alt="proteinCompare"
              className="linkImg"
            />
            <span className="grayLink">protein compare</span>
          </a>
          <a href="http://google.com" className="grayGroup">
            <img src={map} alt="map" className="linkImg" />
            <span className="grayLink">map</span>
          </a>
        </Navbar.Collapse>
      </Navbar>

    </>
  );
};

export default Header;
