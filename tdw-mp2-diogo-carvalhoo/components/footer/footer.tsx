import styled from "styled-components";
import React from "react";

const FooterDiv = styled.footer.attrs((props) => ({
  id: "footer",
  className: "footer",
}))`
  padding: 20px 0;
  font-size: 14px;
  transition: all 0.3s;
  border-top: 1px solid #cddfff;
  bottom: 0;
  margin-top: 50px;

  .copyright {
    text-align: center;
    color: #012970;
  }

  .credits {
    padding-top: 5px;
    text-align: center;
    font-size: 13px;
    color: #012970;
  }
`;

function Footer() {
  return (
    <FooterDiv id="footer">
      <div className="copyright">
        &copy; Copyright{" "}
        <strong>
          <span>NiceAdmin</span>
        </strong>
        . All Rights Reserved
      </div>
      <div className="credits">
        Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
      </div>
    </FooterDiv>
  );
}

export default Footer;
