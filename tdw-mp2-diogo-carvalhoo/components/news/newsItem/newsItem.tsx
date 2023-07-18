import React from "react";
import styled from "styled-components";
import { BiLinkExternal } from "react-icons/bi";

const NewsItemDiv = styled.div`
  margin-top: 15px;
`;

const NewsItemH4 = styled.h4`
  font-size: 15px;
  margin-left: 95px;
  font-weight: bold;
  margin-bottom: 5px;

  p {
    color: #012970;
    transition: 0.3s;
    margin-bottom: 0;
  }
`;

const NewsItemP = styled.p`
  font-size: 14px;
  color: #777777;
  margin-left: 95px;
`;

const NewsItemImage = styled.img`
  width: 50px;
  float: left;
  border-radius: 5px;
`;

interface NewsItemProps {
  news_info_title: string;
  news_info_source: string;
  news_info_url: string;
}

function NewsItem({
  news_info_title,
  news_info_source,
  news_info_url,
}: NewsItemProps) {
  return (
    <NewsItemDiv>
      <NewsItemImage src="/news.jpg" alt="News Default Image"></NewsItemImage>
      <NewsItemH4>
        <p>{news_info_title}</p>
      </NewsItemH4>
      <NewsItemP>
        Source: {news_info_source} <br></br>
        <span>
          <a href={news_info_url} target={"_blank"} rel="noreferrer">
            Link
            <BiLinkExternal />
          </a>
        </span>
      </NewsItemP>
    </NewsItemDiv>
  );
}

export default NewsItem;
