import React from "react";
import { Nav, Container, Col, Row, Navbar } from "react-bootstrap";

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

        <Nav>
          <Nav.Item as="li">
            <Nav.Link href="http://google.com" className="main-nav">
              EBOLA
            </Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link href="/home" className="main-nav">
              CORONA
            </Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link href="/home" className="main-nav">
              DENGUE
            </Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link href="/home" className="main-nav">
              POLIO
            </Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link href="/home" className="main-nav">
              RHINO
            </Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link href="/home" className="main-nav">
              FLU
            </Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link href="/home" className="main-nav">
              About
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>

      <Navbar
        style={{ background: "#5E5E5E", marginRight: -15, marginLeft: -15 }}
      >
        <Navbar.Collapse>
          <span className="grayTitle" style={{ "margin-left": "25px" }}>
            DISCOVER:
          </span>

          <a href="http://google.com">
            <img src={analyze} alt="seqnavLogo" className="logoImg" />

            <span className="grayLink">analyze</span>
          </a>
          <img src={learn} alt="seqnavLogo" className="logoImg" />

          <span className="grayLink">learn</span>
        </Navbar.Collapse>

        <Navbar.Collapse className="justify-content-end">
          <span className="grayTitle">VISUALISE:</span>

          <img src={phylogeny} alt="phylogeny" className="logoImg" />

          <span className="grayLink">phylogeny</span>

          <img src={alingment} alt="alingment" className="logoImg" />

          <span className="grayLink">alingment</span>

          <img src={proteinCompare} alt="proteinCompare" className="logoImg" />

          <span className="grayLink">proteinCompare</span>

          <img src={map} alt="map" className="logoImg" />

          <span className="grayLink">map</span>
        </Navbar.Collapse>
      </Navbar>

      {/* <div className="row" style={{ background: "#5E5E5E" }}>
        <div className="col-sm-5">
          <span className="grayTitle" style={{ "margin-left": "25px" }}>
            DISCOVER:
          </span>

          <a href="http://google.com">
            <img src={analyze} alt="seqnavLogo" className="logoImg" />

            <span className="grayLink">analyze</span>
          </a>
          <img src={learn} alt="seqnavLogo" className="logoImg" />

          <span className="grayLink">learn</span>
        </div>
        <div className="col-sm-7" style={{ "text-align": "right" }}>
          <span className="grayTitle">VISUALISE:</span>

          <img src={phylogeny} alt="phylogeny" className="logoImg" />

          <span className="grayLink">phylogeny</span>

          <img src={alingment} alt="alingment" className="logoImg" />

          <span className="grayLink">alingment</span>

          <img src={proteinCompare} alt="proteinCompare" className="logoImg" />

          <span className="grayLink">proteinCompare</span>

          <img src={map} alt="map" className="logoImg" />

          <span className="grayLink">map</span>
        </div>
      </div> */}
    </>
  );
};

export default Header;
