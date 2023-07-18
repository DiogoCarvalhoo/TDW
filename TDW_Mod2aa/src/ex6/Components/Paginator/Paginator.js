import styled from "styled-components";
import PropTypes from "prop-types";

const PaginatorDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 72px;
  gap: 36px;
`;

function Paginator({ current_page, changePage }) {
  return (
    <PaginatorDiv>
      {current_page > 0 && (
        <button onClick={() => changePage(current_page - 1)}>Previous</button>
      )}
      <span> {current_page} </span>
      <button onClick={() => changePage(current_page + 1)}>Next</button>
    </PaginatorDiv>
  );
}

Paginator.propTypes = {
  current_page: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
};

export default Paginator;
