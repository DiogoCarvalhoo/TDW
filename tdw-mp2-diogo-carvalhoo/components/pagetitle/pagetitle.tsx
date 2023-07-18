import React from "react";
import styled from "styled-components";
import Link from "next/link";

const PagetitleDiv = styled.div`
  margin-bottom: 10px;

  > h1 {
    font-size: 24px;
    margin-bottom: 0;
    font-weight: 600;
    color: #012970;
  }
`;

const PageItemLi = styled.li`
  font-size: 14px;
  font-family: "Nunito", sans-serif;
  color: #899bbd;
  font-weight: 600;

  a {
    color: #899bbd;
    transition: 0.3s;
  }

  a:hover {
    color: #51678f;
  }
`;

interface PageTitleProps {
  currentPage: string;
  currentPageHref: string;
  previousPage: string;
  previousPageHref: string;
}

function PageTitle({
  currentPage,
  currentPageHref,
  previousPage,
  previousPageHref,
}: PageTitleProps) {
  return (
    <PagetitleDiv>
      <h1>{currentPage}</h1>
      <nav>
        <ol className="breadcrumb">
          <PageItemLi className="breadcrumb-item">
            <Link href={previousPageHref}>{previousPage}</Link>
          </PageItemLi>
          <PageItemLi className="breadcrumb-item active">
            <Link href={currentPageHref}>{currentPage}</Link>
          </PageItemLi>
        </ol>
      </nav>
    </PagetitleDiv>
  );
}

export default PageTitle;
