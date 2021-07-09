import React from "react";
import Router from './router';

import {Navbar,Nav} from  'react-bootstrap';


export default function App() {
  return (
      <div>
      <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Otto International Assignment</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#todo">TODO LIST</Nav.Link>
      <Nav.Link href="#forcast">WEATHER FORCAST</Nav.Link>
    </Nav>
  </Navbar>
  <Router />
      </div>
  );
}
