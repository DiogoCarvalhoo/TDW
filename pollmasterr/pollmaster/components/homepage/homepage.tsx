import Image from "next/image";

import styled from "styled-components";

import PageCard from "./page_card";

const ImageResponsiveDiv = styled.div`
  height: 100px;
  position: relative;
`;

export default function HomePage() {
  return (
    <div className="container px-4 mt-5">
      <div className="row mt-5 mb-5">
        <div className="col-xl-2"></div>
        <div className="col-xl-8">
          <ImageResponsiveDiv>
            <Image
              fill
              sizes="100"
              id="header-logo"
              src="/img/logo-no-background.png"
              alt="PollMaster logo"
              style={{ objectFit: "contain" }}
            />
          </ImageResponsiveDiv>
        </div>
        <div className="col-xl-2"></div>
      </div>

      <div className="row g-3 my-2">
        <div className="col-xl-6">
          <PageCard
            header="Polls"
            text="Visualize e vote em todas as polls ativas da aplicação. "
            path="/polls"
          />
        </div>

        <div className="col-xl-6">
          <PageCard
            header="Criar uma poll"
            text="Crie uma poll com diversas opções para todo o mundo! "
            path="/new_poll"
          />
        </div>

      </div>
    </div>
  );
}
