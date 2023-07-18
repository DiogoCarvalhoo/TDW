import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TfiReload } from "react-icons/tfi";
import NewsItem from "../newsItem/newsItem";

import { useGetNewsQuery } from "../../../redux/reducers/newsReducer";
import { NewsContent } from "../../../pages";

const NewsDiv = styled.div`
  margin-bottom: 30px;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 0 30px rgba(1, 41, 112, 0.1);
`;

const NewsBody = styled.div`
  padding: 0 20px 20px 20px;
  background-color: white;
`;

const NewsH5 = styled.h5`
  padding: 20px 0 15px 0;
  font-size: 18px;
  font-weight: 500;
  color: #012970;
  font-family: "Poppins", sans-serif;
  width: 80%;
  display: inline-block;

  span {
    color: #899bbd;
    font-size: 14px;
    font-weight: 400;
  }
`;

interface NewsSectionProps {
  newsData: NewsContent[];
}

function NewsSection({ newsData }: NewsSectionProps) {
  const [newsPage, setNewsPage] = useState<number>(1);
  const [skip, setSkip] = useState<boolean>(true);
  const { data, error, isLoading } = useGetNewsQuery(newsPage, { skip });

  const filterNews = (news: NewsContent[]) => {
    let contador = 0;
    let list = [];
    for (let i = 0; i < news.length; i++) {
      if (news[i].language === "en") {
        list.push(news[i]);
        contador++;
        if (contador === 3) {
          return list;
        }
      }
    }
    return list;
  };

  var newsToDisplay: NewsContent[] = [];
  if (data) {
    newsToDisplay = filterNews(data.articles);
  } else {
    newsToDisplay = filterNews(newsData);
  }

  return (
    <NewsDiv>
      <NewsBody className="pb-0">
        <NewsH5>
          News &amp; Updates <span>| Today </span>
        </NewsH5>

        <TfiReload
          onClick={() => {
            setSkip(false);
            setNewsPage(newsPage + 1);
          }}
        ></TfiReload>

        <div id="news_content_div" className="news">
          {newsToDisplay.length > 0 ? (
            newsToDisplay.map(function (newsItem, index) {
              return (
                <NewsItem
                  key={index}
                  news_info_title={newsItem.title}
                  news_info_source={newsItem.rights}
                  news_info_url={newsItem.link}
                ></NewsItem>
              );
            })
          ) : (
            <p>No News Available!</p>
          )}
        </div>
      </NewsBody>
    </NewsDiv>
  );
}

export default NewsSection;
