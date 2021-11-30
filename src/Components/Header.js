import React from "react";
import { Container, Navbar, NavbarBrand } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";

function Header() {
  return (
    <Navbar>
      <Container>
        <NavbarBrand>TodoRewarder</NavbarBrand>
        <NavbarToggle />
        <NavbarCollapse className="justify-content-end">
          <Navbar.Text>Connect Your Wallet</Navbar.Text>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
}

export default Header;
