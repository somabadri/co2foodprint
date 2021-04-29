import React, { Component } from "react";

import styled from "styled-components";
//import Typography from "material-ui/Typography";

const FooterContainer = styled.div`

  text-align: center;
  position: absolute;
  bottom: 0;
  width: 100% !important;
  height: 66px !important ;
  background: #84A98C;
  color: #2F3E46
`;

class Footer extends Component {
  render() {
    return (
      <FooterContainer>
          <p align="center">
              Carbon Cutters 2021
          </p>
        {/* <Typography variant="title">Footer Text</Typography> */}
      </FooterContainer>
    );
  }
}

export default Footer;