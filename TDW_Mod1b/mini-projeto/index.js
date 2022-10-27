var api_url = "https://data.nba.net/10s/prod/v1/2022/";
var photos_api_url =
  "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/";
var news_api_url = "https://nba-stories.herokuapp.com/";

const news_content_div = document.getElementById("news_content_div");

var news;

async function main() {
  // Get News Info
  createListOfNews(5);

  // Append hrefs to carrousel-items
  document
    .getElementById("carousel_item1_a")
    .setAttribute(
      "href",
      window.location.href.substring(0, window.location.href.lastIndexOf("/")) +
        "/team.html?id=1610612744"
    );

  document
    .getElementById("carousel_item2_a")
    .setAttribute(
      "href",
      window.location.href.substring(0, window.location.href.lastIndexOf("/")) +
        "/team.html?id=1610612749"
    );

  document
    .getElementById("carousel_item3_a")
    .setAttribute(
      "href",
      window.location.href.substring(0, window.location.href.lastIndexOf("/")) +
        "/team.html?id=1610612747"
    );
}

/* Function to Create the total list of News on News Side Column */

async function createListOfNews(limit) {
  if (limit == "current") {
    // Get current number of news
    limit = document.getElementsByName("side_column_news").length;
  }

  news_content_div.innerHTML = "";
  var data = [];

  await fetch(news_api_url + "news?limit=" + limit).then(async function (
    response
  ) {
    data = await response.json();
  });

  for (let i = 0; i < limit; i++) {
    createNewsItem(data[i]);
  }
}

/* Function to Create News Item on News Side Column */

function createNewsItem(news_info) {
  var news_div = document.createElement("div");
  news_div.classList.add("post-item");
  news_div.classList.add("clearfix");
  news_div.setAttribute("name", "side_column_news");

  var news_img = document.createElement("img");
  news_img.setAttribute("src", "assets/img/news.jpg");
  news_img.setAttribute("alt", "News Image");

  var news_h4 = document.createElement("h4");

  var news_a_title = document.createElement("a");
  news_a_title.setAttribute("href", "#");
  news_a_title.innerHTML = news_info.title;

  var news_a_link = document.createElement("a");
  news_a_link.setAttribute("href", news_info.url);
  news_a_link.setAttribute("target", "_blank");
  news_a_link.innerHTML = "Link";

  var news_i = document.createElement("i");
  news_i.classList.add("ri-external-link-line");

  var news_span = document.createElement("span");

  news_a_link.appendChild(news_i);
  news_span.appendChild(news_a_link);

  var news_p1 = document.createElement("p");
  news_p1.innerHTML =
    "Source: " + news_info.source + "<br>" + news_span.outerHTML;

  news_h4.appendChild(news_a_title);
  news_div.appendChild(news_img);
  news_div.appendChild(news_h4);
  news_div.appendChild(news_p1);
  news_content_div.appendChild(news_div);
}

/*
news_a.setAttribute("target", "_blank");
*/
