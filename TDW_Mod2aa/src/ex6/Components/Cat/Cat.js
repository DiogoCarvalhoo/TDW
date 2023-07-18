import styled from "styled-components";

const CatDiv = styled.div`
  img {
    width: 100%;
    height: auto;
  }
`;

function Cat({ cat_info }) {
  return (
    <CatDiv>
      <img src={cat_info.url} alt={"cat with id=" + cat_info.id}></img>
    </CatDiv>
  );
}

export default Cat;
