import React from "react";

import PageTitle from "../components/pagetitle/pagetitle";
import { CardDiv, CardTitleH5, CardBodyDiv } from "../components/styles/card";
import Image from "next/image";

export default function Aboutus() {
  return (
    <>
      <PageTitle
        currentPage={"About Us"}
        currentPageHref={"/aboutus"}
        previousPage={"Home"}
        previousPageHref={"/"}
      ></PageTitle>

      <div className="row">
        <div className="col-lg-12">
          <CardDiv>
            <CardBodyDiv>
              <CardTitleH5>
                NBAFollowers <span>| Goals</span>
              </CardTitleH5>
              <p>
                NBAFollowers is an application developed under an academic
                environment. <br></br> The main goal is to provide an
                interactive and easy to use web interface for NBA lovers to get
                information about their favourite teams and players. <br></br>{" "}
                Additionally, a mini game was developed which can be used by
                anyone who wants to get some fun. <br></br>Enjoy!
              </p>
            </CardBodyDiv>
          </CardDiv>

          <CardDiv>
            <CardBodyDiv>
              <CardTitleH5>
                NBAFollowers <span>| Developer Team</span>
              </CardTitleH5>
              <CardDiv
                style={{
                  maxHeight: "340px",
                  maxWidth: "240px",
                  textAlign: "center",
                  margin: "0 auto",
                }}
              >
                <Image
                  alt="Developer Team Member Image"
                  src={"/eu.jpg"}
                  width={240}
                  height={240}
                />

                <CardBodyDiv>
                  <CardTitleH5>
                    Diogo Carvalho <br></br> Developer
                  </CardTitleH5>
                </CardBodyDiv>
              </CardDiv>
            </CardBodyDiv>
          </CardDiv>
        </div>
      </div>
    </>
  );
}
