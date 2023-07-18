import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../../redux/reducers/catsReducer";

const PaginatorDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 72px;
  gap: 36px;
`;

function Paginator() {
  const current_page = useSelector((state) => state.cats.current_page);
  const dispatch = useDispatch();

  return (
    <PaginatorDiv>
      {current_page > 0 && (
        <button onClick={() => dispatch(changePage(current_page - 1))}>
          Previous
        </button>
      )}
      <span> {current_page} </span>
      <button onClick={() => dispatch(changePage(current_page + 1))}>
        Next
      </button>
    </PaginatorDiv>
  );
}

export default Paginator;
