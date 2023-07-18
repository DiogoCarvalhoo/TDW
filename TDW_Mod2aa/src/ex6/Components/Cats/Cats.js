import styled from "styled-components";
import Cat from "../Cat/Cat";
import Paginator from "../Paginator/Paginator";
import { useGetAllCatsQuery } from "../../redux/reducers/catsReducer";
import { useState } from "react";

const CatsListDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

function CatsList() {
  const [current_page, set_current_page] = useState(0);

  const {
    data = [],
    isFetching,
    error,
  } = useGetAllCatsQuery({ limit: 20, page: current_page });

  return (
    <div>
      {error ? (
        <h1>Oh no, there was an error</h1>
      ) : isFetching ? (
        <h1>loading ...</h1>
      ) : data ? (
        <div>
          <CatsListDiv>
            {data.map((cat, key) => {
              return <Cat key={key} cat_info={cat}></Cat>;
            })}
          </CatsListDiv>
          <Paginator
            current_page={current_page}
            changePage={(new_page) => set_current_page(new_page)}
          ></Paginator>
        </div>
      ) : null}
    </div>
  );
}

export default CatsList;
