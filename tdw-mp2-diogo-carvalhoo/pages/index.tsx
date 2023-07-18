import React from "react";

import PageTitle from "../components/pagetitle/pagetitle";
import HomeCarousel from "../components/homeCarousel/homeCarousel";
import NewsSection from "../components/news/newsSection/newsSection";
import { GetServerSideProps } from "next";

export interface NewsContent {
  summary: string;
  country: string;
  author: string;
  rights: string;
  link: string;
  rank: number;
  topic: string;
  language: string;
  title: string;
  published_date: string;
  _id: string;
  _score: number;
}

interface HomeProps {
  newsData: NewsContent[];
}

export default function Home({ newsData }: HomeProps) {
  return (
    <>
      <PageTitle
        currentPage={"HomePage"}
        currentPageHref={"/"}
        previousPage={"Home"}
        previousPageHref={"/"}
      ></PageTitle>

      <div className="row">
        <div className="col-lg-8">
          <HomeCarousel></HomeCarousel>
        </div>

        <div className="col-lg-4">
          <NewsSection newsData={newsData}></NewsSection>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const news_request_res = await fetch(
    "https://newscatcher.p.rapidapi.com/v1/search?q=NBA&page=1",
    {
      headers: {
        "X-RapidAPI-Key": "ce2a9741fbmshc7f82170a3ebc45p133e91jsn43e9d15777bc",
        "X-RapidAPI-Host": "newscatcher.p.rapidapi.com",
      },
    }
  );
  const newsData = await news_request_res.json();

  return {
    props: {
      newsData: newsData.articles,
    },
  };
};
