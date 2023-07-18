import styled from "styled-components";
import Cat from "../Cat/Cat";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Paginator from "../Paginator/Paginator";
import { fetchCats } from "../../redux/reducers/catsReducer";

const CatsListDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

function CatsList() {
  const dispatch = useDispatch();
  const current_page = useSelector((state) => state.cats.current_page);
  const cats_list = useSelector((state) => state.cats.cats_list);
  const isLoading = useSelector((state) => state.cats.isLoading);

  useEffect(() => {
    if (cats_list[current_page] === undefined) {
      dispatch(fetchCats(current_page));
    }
  }, [cats_list, current_page, dispatch]);

  return (
    <div>
      {isLoading ? (
        <h1>loading ...</h1>
      ) : (
        <div>
          <CatsListDiv>
            {cats_list[current_page].map((item, key) => {
              return <Cat key={key} cat_info={item}></Cat>;
            })}
          </CatsListDiv>
          <Paginator></Paginator>
        </div>
      )}
    </div>
  );
}

export default CatsList;
