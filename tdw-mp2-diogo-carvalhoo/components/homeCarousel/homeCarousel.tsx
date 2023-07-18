import { useRouter } from "next/router";
import React from "react";
import Carousel from "react-bootstrap/Carousel";

function HomeCarousel() {
  const router = useRouter();

  return (
    <Carousel>
      <Carousel.Item interval={1500}>
        <img
          className="d-block w-100"
          src="/2022champions.jpg"
          alt="2022 Champion Team Image"
          onClick={() => router.push("/team/11")}
        />
      </Carousel.Item>
      <Carousel.Item interval={1500}>
        <img
          className="d-block w-100"
          src="/2021champions.webp"
          alt="2021 Champion Team Image"
          onClick={() => router.push("/team/21")}
        />
      </Carousel.Item>
      <Carousel.Item interval={1500}>
        <img
          className="d-block w-100"
          src="/2020champions.jpg"
          alt="2020 Champion Team Image"
          onClick={() => router.push("/team/17")}
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeCarousel;
